from app.decorators import limit_to_json
from app.services import GetAddressService
from app.utilities import APIResponse
from .. import rest


@rest.post("/postcode/lookup")
@limit_to_json
def postcode_lookup(json):
    postcode = json.get("postcode")
    refresh_cache = json.get("refresh_cache", False)

    get_address_service = GetAddressService()
    ok, data = get_address_service.find(postcode, refresh_cache)

    if not ok:
        return APIResponse.fail(
            message=f"Failed to lookup postcode: {postcode} - {data}",
        )

    return APIResponse.success(
        message="Postcode lookup successful",
        data=data,
    )
