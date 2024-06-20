from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from app.sql import GDBSession
from app.sql.queries.testing import query_create_test_clients


def create_test_clients(data):
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
        s.execute(query_create_test_clients(amount))
        s.commit()

        return RPCResponse.success(
            {
                "clients_created": amount,
            },
            "Clients created.",
        )
