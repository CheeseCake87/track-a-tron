from quart_rpc.version_1_0 import RPCResponse

from app.sql import DBSession
from app.sql.queries.task_status import query_create_task_status
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict


def create_task_status(data):
    d = DataDict(data)
    try:
        values = d.get_ensure_key("values")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "values": "dict",
            },
        )

    with DBSession as s:
        query = query_create_task_status(
            values,
            [
                "task_status_id",
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
            "Status created.",
        )
        s.commit()
        return response
