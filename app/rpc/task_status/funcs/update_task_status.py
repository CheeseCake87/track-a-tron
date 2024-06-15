from quart_rpc.version_1_0 import RPCResponse

from app.sql import DBSession
from app.sql.queries.task_status import query_update_task_status
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict


def update_task_status(data):
    ignored_fields = ["status_id"]

    d = DataDict(data)
    try:
        status_id = d.get_ensure_key("status_id")
        values = d.get_ensure_key("values")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "status_id": "int",
                "values": "dict = {}",
            },
        )

    with DBSession as s:
        result = s.execute(
            query_update_task_status(status_id, values, ignored_fields)
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
            "Status updated.",
        )

        s.commit()

        return response
