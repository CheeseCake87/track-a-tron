from quart_rpc.version_1_0 import RPCResponse  # noqa

from app.rpc.security import session_check
from app.sql import DBSession
from app.sql.queries.client import query_read_client
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict


@session_check("logged_in", True)
def get_client(data):
    d = DataDict(data)
    try:
        where = d.get_ensure_key("where")
    except DataException:
        return RPCResponse.fail("Missing required data.", {"where": "{field: value}"})

    with DBSession as s:
        query = query_read_client(where)

        if query is None:
            return RPCResponse.fail(
                "No valid where clause provided.", {"where": "{field: value}"}
            )

        result = s.execute(query).scalars().all()
        if not result:
            return RPCResponse.fail("No client found.")

        return RPCResponse.success(
            [
                {
                    **{k: v for k, v in r.__dict__.items() if not k.startswith("_")},
                }
                for r in result
            ],
            "Client found.",
        )
