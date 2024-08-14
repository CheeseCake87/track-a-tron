from app.decorators import limit_to_json
from app.utilities import APIResponse
from .. import rest
from ..query.system_service import query_update_service


@rest.get("/update/system/service")
@limit_to_json
def update_system_service(json):

    name = json.get("name")
    service_data = json.get("data")
    enabled = json.get("enabled")

    update_service = query_update_service(
        name=name,
        data=service_data,
        enabled=enabled,
    )

    if not update_service:
        return APIResponse.fail(
            "Unable to update system service.",
        )

    return APIResponse.success(
        message="System service updated.",
        data=
        {
            "name": name,
            "data": service_data,
            "enabled": enabled,
        }
    )
