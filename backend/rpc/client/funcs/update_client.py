from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from backend.sql import GDBSession
from backend.sql.queries.client import query_update_client


def update_client(data):
    ignored_fields = ["client_id", "created"]

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

    with GDBSession as s:
        result = s.execute(
            query_update_client(client_id, values, ignored_fields)
        ).scalar_one_or_none()

        if not result:
            return RPCResponse.fail("Error updating client.")

        response = RPCResponse.success(
            {
                **{k: v for k, v in result.__dict__.items() if not k.startswith("_")},
            },
            "Client updated.",
        )

        s.commit()

        return response
