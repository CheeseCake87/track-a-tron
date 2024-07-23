import random

from faker import Faker
from sqlalchemy import select, insert, update  # noqa: F401

from backend.sql.tables import Client
from backend.utilities.datetime_delta import DatetimeDeltaMC
f = Faker()


def query_create_test_clients(amount_to_create: int):
    values = []
    random_date_values = [-1, 0, -2, -40, -30, -11, -4, -3]
    for i in range(0, amount_to_create):
        values.append(
            {
                "fk_user_id": 1,
                "first_name": f.first_name(),
                "last_name": f.last_name(),
                "created": DatetimeDeltaMC().days(random.choice(random_date_values)).datetime,
            }
        )

    in_ = insert(Client).values(values)
    return in_
