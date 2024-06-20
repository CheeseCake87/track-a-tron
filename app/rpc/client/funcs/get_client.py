from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse  # noqa

from app.sql import DBSession
from app.sql.queries.client import query_read_client


def get_client(data):
    d = DataDict(data)
    try:
        client_id = d.get_ensure_key("client_id")
    except DataException:
        return RPCResponse.fail("Missing required data.", {"where": "{field: value}"})

    with DBSession as s:
        query = query_read_client({"client_id": client_id})

        if query is None:
            return RPCResponse.fail(
                "No valid where clause provided.", {"where": "{field: value}"}
            )

        result = s.execute(query).scalar_one_or_none()
        if not result:
            return RPCResponse.fail("No client found.")

        return RPCResponse.success(
            {k: v for k, v in result.__dict__.items() if not k.startswith("_")},
            "Client found.",
        )
