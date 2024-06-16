from quart_rpc.version_1_0 import RPCResponse  # noqa

from app.utilities.security import session_check
from app.sql import DBSession
from app.sql.queries.client import query_create_client
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict


@session_check("logged_in", True)
def create_client(data):
    d = DataDict(data)
    try:
        values = d.get_ensure_key("team_id")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "values": "dict",
            },
        )

    with DBSession as s:
        query = query_create_client(
            values,
            [
                "client_id",
                "fk_team_id",
            ],
        )
        result = s.execute(query).scalars().all()

        response = RPCResponse.success(
            [
                {
                    **{k: v for k, v in r.__dict__.items() if not k.startswith("_")},
                }
                for r in result
            ],
            "Client created.",
        )

        s.commit()

        return response
