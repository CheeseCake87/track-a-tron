from quart_rpc.version_1_0 import RPCResponse

from app.sql import DBSession
from app.sql.queries.task_status import query_get_task_status
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict


def get_task_status(data):
    d = DataDict(data)
    try:
        where = d.get_ensure_key("where")
    except DataException:
        return RPCResponse.fail("Missing required data.", {"where": "{field: value}"})

    with DBSession as s:
        query = query_get_task_status(where)

        if query is None:
            return RPCResponse.fail(
                "No valid where clause provided.", {"where": "{field: value}"}
            )

        result = s.execute(query).scalars().all()
        if not result:
            return RPCResponse.fail("No status found.")

        return RPCResponse.success(
            [
                {
                    **{k: v for k, v in r.__dict__.items() if not k.startswith("_")},
                }
                for r in result
            ],
            "Status found.",
        )
