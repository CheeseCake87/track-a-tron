from app.decorators import limit_to_json
from app.utilities import APIResponse
from flask_imp.security import api_login_check
from .. import rest
from ..query.system_user import (
    query_update_system_user,
)


@rest.post("/update/user/<int:user_id>")
@api_login_check("logged_in", True, {"navigate": "/login"})
@limit_to_json
def update_system_user(json, user_id):

    updated_system_user = query_update_system_user(
        user_id=user_id,
        values=json,
    )
    if not updated_system_user:
        return APIResponse.fail(
            "Unable to update system user.",
        )

    return APIResponse.success(
        message="System user updated.",
        data={
            "user_id": updated_system_user.user_id,
            "username": updated_system_user.username,
            "display_name": updated_system_user.display_name,
            "email": updated_system_user.email,
            "sms": updated_system_user.sms,
            "private_key": updated_system_user.private_key,
            "user_type": updated_system_user.user_type,
            "disabled": updated_system_user.disabled,
            "created": updated_system_user
        }
    )
