from quart_rpc.version_1_0 import RPCResponse

from app.sql import DBSession
from app.sql.queries.client import query_update_client
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict


def update_client(data):
    ignored_fields = ["client_id"]

    d = DataDict(data)
    try:
        client_id = d.get_ensure_key("client_id")
        values = d.get_ensure_key("values")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "client_id": "int",
                "values": "dict = {}",
            },
        )

    with DBSession as s:
        result = s.execute(
            query_update_client(client_id, values, ignored_fields)
        ).scalar_one_or_none()

        if not result:
            return RPCResponse.fail("Error updating status.")

        response = RPCResponse.success(
            [
                {
                    **{k: v for k, v in r.__dict__.items() if not k.startswith("_")},
                }
                for r in result
            ],
            "Client updated.",
        )

        s.commit()

        return response
