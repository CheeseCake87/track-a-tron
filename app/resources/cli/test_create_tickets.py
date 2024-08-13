import random

import click
from flask import current_app as app


@app.cli.command("create-tickets")
@click.argument("amount", type=int)
def create_clients(amount):
    from app.utilities import DatetimeDeltaMC
    from app.extensions import db
    from app.api.workshop.query.workshop_ticket import (
        query_create_workshop_ticket,
        query_count_workshop_tickets,
        query_create_workshop_ticket_device,
        query_create_workshop_ticket_item,
    )

    app.logger.info(f"{amount} clients created.")

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
    random_date_values = [-1, 0, -2, -40, -30, -11, -4, -3]

    count_tickets = query_count_workshop_tickets()
    this_datetime = DatetimeDeltaMC().days(random.choice(random_date_values)).datetime

    for i in range(0, amount):
        count_tickets += 1
        new_ticket = query_create_workshop_ticket(
            user_id=1,
            assigned_user_id=1,
            client_id=1,
            category_code=1,
            status_code=1,
            request="Test request",
            no_due_datetime=True,
            due_datetime=None,
            created=this_datetime,
            _auto_commit=False,
        )

        workshop_ticket_id = new_ticket.workshop_ticket_id

        for j in range(0, random.randrange(1, 3)):
            query_create_workshop_ticket_device(
                workshop_ticket_id=workshop_ticket_id,
                user_id=1,
                type_=random.choice(random_device_types),
                make=random.choice(random_makes),
                model=random.choice(random_birds),
                serial_number=f"{random.randint(1000, 9999)}-"
                              f"{random.randint(1000, 9999)}-"
                              f"{random.randint(1000, 9999)}-"
                              f"{random.randint(1000, 9999)}",
                power_adapter_included=random.choice([True, False]),
                additional_info=None,
                _created=this_datetime,
                _auto_commit=False,
            )

        for h in range(0, random.randrange(1, 3)):
            query_create_workshop_ticket_item(
                workshop_ticket_id=workshop_ticket_id,
                user_id=1,
                description=f"Test item {h}",
                _created=this_datetime,
                _auto_commit=False,
            )

        db.session.commit()

    app.logger.info(f"{amount} tickets created.")
