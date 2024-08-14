from app.utilities import APIResponse
from .. import rest
from ..query.system_service import query_read_all_enabled_services


@rest.get("/get/enabled/services")
def get_system_services_enabled():
    enabled_system_services = query_read_all_enabled_services()

    if not enabled_system_services:
        return APIResponse.fail(
            "No enabled system services found.",
        )

    return APIResponse.success(
        message="Enabled system services found.",
        data=[
            service.name for service in enabled_system_services
        ],
    )