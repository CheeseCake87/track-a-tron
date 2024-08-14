from app.decorators import limit_to_json
from app.services import GetAddressService
from app.utilities import APIResponse
from flask_imp.security import api_login_check
from .. import rest


@rest.post("/postcode/lookup")
@api_login_check("logged_in", [True], APIResponse.fail("You need to be logged in to access this."))
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
