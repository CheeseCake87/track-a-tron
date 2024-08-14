from app.utilities import APIResponse
from .. import rest
from ..query.system_service import query_read_all_services


@rest.get("/services")
def get_system_services():
    system_services = query_read_all_services()

    if not system_services:
        return APIResponse.fail(
            "No system services found.",
        )

    return APIResponse.success(
        message="System services found.",
        data=[
            {
                "category": service.category,
                "name": service.name,
                "data": service.data,
                "enabled": service.enabled,
            }
            for service in system_services
        ]
    )
