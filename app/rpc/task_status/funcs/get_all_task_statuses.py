from quart_rpc.version_1_0 import RPCResponse

from app.sql import DBSession
from app.sql.queries.task_status import query_read_all_task_statuses


def get_all_task_statuses(_):
    with DBSession as s:
        query = query_read_all_task_statuses()
        statuses = s.execute(query).scalars().all()
        if not statuses:
            return RPCResponse.fail("No task statuses found.")

        return RPCResponse.success(
            [
                {
                    **{k: v for k, v in r.__dict__.items() if not k.startswith("_")},
                }
                for r in statuses
            ],
            "Statuses retrieved.",
        )
