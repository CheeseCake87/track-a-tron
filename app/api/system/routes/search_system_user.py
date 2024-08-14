from app.decorators import limit_to_json
from app.utilities import APIResponse
from .. import rest
from ..query.system_user import (
    query_read_system_user,
)


@rest.post("/search/user")
@limit_to_json
def search_system_user(json):

    where = json.get("where")

    system_user = query_read_system_user(where)
    if not system_user:
        return APIResponse.fail(
            "No system user found.",
        )

    return APIResponse.success(
        message="System user found.",
        data={
            "user_id": system_user.user_id,
            "username": system_user.username,
            "display_name": system_user.display_name,
            "email": system_user.email,
            "sms": system_user.sms,
            "private_key": system_user.private_key,
            "user_type": system_user.user_type,
            "disabled": system_user.disabled,
            "created": system_user.created,
        }
    )
