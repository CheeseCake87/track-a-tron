from quart_rpc.version_1_1 import RPCResponse

from app.sql import GDBSession
from app.sql.queries.system_log import query_read_all_system_logs


def get_logs(_):
    with GDBSession as s:
        result = s.execute(query_read_all_system_logs()).scalars().all()

        return RPCResponse.success(
            result,
            "Logs.",
        )
