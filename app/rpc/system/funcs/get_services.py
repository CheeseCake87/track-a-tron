from quart_rpc.version_1_0 import RPCResponse

from app.sql import DBSession
from app.sql.queries.service import query_read_all_services


def get_services(_):
    with DBSession as s:
        services = s.execute(query_read_all_services()).scalars()
        if not services:
            return RPCResponse.fail(
                "No services found.",
                False,
            )

        return RPCResponse.success(
            {
                "services": [
                    {
                        "category": service.category,
                        "name": service.name,
                        "data": service.data,
                        "enabled": service.enabled,
                    }
                    for service in services
                ]
            },
            "System is setup.",
        )
