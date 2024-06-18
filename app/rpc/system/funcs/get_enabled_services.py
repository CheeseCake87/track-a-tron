from quart_rpc.version_1_0 import RPCResponse

from app.sql import DBSession
from app.sql.queries.system_service import query_read_all_services


def get_enabled_services(_):
    with DBSession as s:
        services = s.execute(query_read_all_services()).scalars()
        if not services:
            return RPCResponse.fail(
                "No services found.",
                False,
            )

        return RPCResponse.success(
            {
                "enabled_services": [
                    service.name for service in services if service.enabled
                ]
            },
            "Enabled services queried.",
        )
