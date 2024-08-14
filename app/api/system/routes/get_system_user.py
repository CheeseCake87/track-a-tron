from app.utilities import APIResponse
from flask_imp.security import api_login_check
from .. import rest
from ..query.system_user import (
    query_read_system_user_by_user_id,
)


@rest.get("/user/<int:user_id>")
@api_login_check("logged_in", [True], APIResponse.fail("You need to be logged in to access this."))
def get_system_user(user_id):
    system_user = query_read_system_user_by_user_id(user_id)
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
