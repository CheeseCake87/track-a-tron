from app.utilities import APIResponse
from .. import rest
from ..query.system_user import (
    query_read_system_user_by_user_id,
)


@rest.get("/get/user/<int:user_id>")
def get_system_user(user_id):
    system_user = query_read_system_user_by_user_id(user_id)
    if not system_user:
        return APIResponse.fail(
            "No system users found.",
        )

    return APIResponse.success(
        message="System users found.",
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
