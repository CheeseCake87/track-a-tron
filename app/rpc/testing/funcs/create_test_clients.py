import random

from faker import Faker
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse
from sqlalchemy import select, insert, update  # noqa: F401

from app.sql import GDBSession
from app.sql.tables import Client
from app.utilities.datetime_delta import DatetimeDeltaMC


def create_test_clients(data):
    f = Faker()
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
        values = []
        random_date_values = [-1, 0, -2, -40, -30, -11, -4, -3]
        for i in range(0, amount):
            values.append(
                {
                    "fk_user_id": 1,
                    "first_name": f.first_name(),
                    "last_name": f.last_name(),
                    "created": DatetimeDeltaMC()
                    .days(random.choice(random_date_values))
                    .datetime,
                }
            )

        s.execute(insert(Client).values(values))
        s.commit()

        return RPCResponse.success(
            {
                "clients_created": amount,
            },
            "Clients created.",
        )
