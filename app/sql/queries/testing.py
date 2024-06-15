from faker import Faker
from sqlalchemy import select, insert, update  # noqa: F401

from app.sql.tables import Client

f = Faker()


def query_create_test_clients(amount_to_create: int):
    values = []
    for i in range(0, amount_to_create):
        values.append(
            {
                "first_name": f.first_name(),
                "last_name": f.last_name(),
            }
        )

    in_ = insert(Client).values(values)
    return in_
