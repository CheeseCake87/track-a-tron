import random

import click
from flask import current_app as app


@app.cli.command("create-clients")
@click.argument("amount", type=int)
def create_clients(amount):
    from app.api.clients.query.client import query_create_client
    from app.utilities import DatetimeDeltaMC
    from faker import Faker

    f = Faker()
    client_list = []
    random_date_values = [-1, 0, -2, -40, -30, -11, -4, -3]
    for i in range(0, amount):
        client_list.append(
            {
                "fk_user_id": 1,
                "first_name": f.first_name(),
                "last_name": f.last_name(),
                "created": DatetimeDeltaMC()
                .days(random.choice(random_date_values))
                .datetime,
            }
        )

    for row in client_list:
        query_create_client(row)

    app.logger.info(f"{amount} clients created.")
