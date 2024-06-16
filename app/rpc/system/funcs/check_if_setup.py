from quart_rpc.version_1_0 import RPCResponse

from app.sql import DBSession
from app.sql.queries.system import query_read_system


def check_if_setup(_):
    with DBSession as s:
        system = s.execute(query_read_system()).scalar_one_or_none()
        if not system:
            return RPCResponse.fail(
                "System not setup.",
                False,
            )

        return RPCResponse.success(
            True,
            "System is setup.",
        )
