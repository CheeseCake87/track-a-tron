import random

from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse
from sqlalchemy import insert

from app.sql import GDBSession
from app.sql.queries.workshop import query_count_workshop_tickets
from app.sql.tables import WorkshopTicket, WorkshopTicketDevice, WorkshopTicketItem
from app.utilities import DatetimeDeltaMC


def create_test_tickets(data):
    random_device_types = [
        "Phone",
        "Tablet",
        "Laptop",
        "Desktop",
        "Smartwatch",
    ]
    random_makes = [
        "Apple",
        "Samsung",
        "Google",
        "Huawei",
        "Xiaomi",
        "OnePlus",
        "Sony",
        "LG",
        "Motorola",
        "Nokia",
        "HTC",
        "Blackberry",
        "Oppo",
        "Vivo",
        "Realme",
        "Asus",
        "Lenovo",
        "ZTE",
        "Alcatel",
        "TCL",
        "Meizu",
        "Micromax",
        "Lava",
        "Infinix",
        "Tecno",
        "Wiko",
        "Ulefone",
        "Doogee",
        "Cubot",
        "Elephone",
        "Vernee",
        "Leagoo",
        "Homtom",
        "Oukitel",
        "Cubot",
        "Blackview",
        "Umidigi",
        "Xgody",
        "Symphony",
        "Walton",
        "Micromax",
        "Lava",
        "Infinix",
        "Tecno",
        "Wiko",
        "Ulefone",
        "Doogee",
        "Cubot",
        "Elephone",
        "Vernee",
        "Leagoo",
        "Homtom",
        "Oukitel",
        "Cubot",
        "Blackview",
        "Umidigi",
        "Xgody",
        "Symphony",
        "Walton",
    ]
    random_birds = [
        "Sparrow",
        "Robin",
        "Blackbird",
        "Bluebird",
        "Cardinal",
        "Chickadee",
        "Crow",
        "Dove",
        "Eagle",
        "Falcon",
        "Finch",
        "Flamingo",
        "Goose",
        "Hawk",
        "Hummingbird",
        "Kingfisher",
        "Kiwi",
        "Ostrich",
        "Owl",
        "Parrot",
        "Peacock",
        "Pelican",
        "Penguin",
        "Pigeon",
        "Quail",
        "Raven",
        "Seagull",
        "Sparrow",
        "Starling",
        "Swallow",
        "Swan",
        "Turkey",
        "Vulture",
        "Woodpecker",
        "Wren",
    ]

    d = DataDict(data)
    try:
        amount = d.get_ensure_key("amount")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "amount": "int",
            },
        )

    with GDBSession as s:
        random_date_values = [-1, 0, -2, -40, -30, -11, -4, -3]
        count_tickets = s.execute(query_count_workshop_tickets()).scalar()
        this_datetime = (
            DatetimeDeltaMC().days(random.choice(random_date_values)).datetime
        )

        for i in range(0, amount):
            count_tickets += 1
            this_ticket = s.execute(
                insert(WorkshopTicket)
                .values(
                    {
                        "fk_user_id": 1,
                        "fk_assigned_user_id": 1,
                        "fk_client_id": 1,
                        "workshop_tag": f"{count_tickets}-1",
                        "category_code": 1,
                        "status_code": 1,
                        "request": "Test request",
                        "no_due_datetime": True,
                        "due_datetime": None,
                        "created": this_datetime,
                    }
                )
                .returning(WorkshopTicket.workshop_ticket_id)
            )

            workshop_ticket_id = this_ticket.scalar()
            s.flush()

            for j in range(0, random.randrange(1, 3)):
                s.execute(
                    insert(WorkshopTicketDevice).values(
                        {
                            "fk_workshop_ticket_id": workshop_ticket_id,
                            "fk_user_id": 1,
                            "type": random.choice(random_device_types),
                            "make": random.choice(random_makes),
                            "model": random.choice(random_birds),
                            "serial_number": f"{random.randint(1000, 9999)}-"
                            f"{random.randint(1000, 9999)}-"
                            f"{random.randint(1000, 9999)}-"
                            f"{random.randint(1000, 9999)}",
                            "power_adapter_included": random.choice([True, False]),
                            "additional_info": None,
                            "created": this_datetime,
                        }
                    )
                )

            for h in range(0, random.randrange(1, 3)):
                s.execute(
                    insert(WorkshopTicketItem).values(
                        {
                            "fk_workshop_ticket_id": workshop_ticket_id,
                            "fk_user_id": 1,
                            "description": f"Test item {h}",
                            "created": this_datetime,
                        }
                    )
                )

        s.commit()

        return RPCResponse.success(
            {
                "tickets_created": amount,
            },
            "Tickets created.",
        )
