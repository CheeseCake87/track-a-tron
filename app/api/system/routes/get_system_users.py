from app.utilities import APIResponse
from flask_imp.security import api_login_check
from .. import rest
from ..query.system_user import (
    query_read_all_system_users,
    query_read_all_active_system_users,
)


@rest.get("/get/active/users")
@api_login_check("logged_in", [True], APIResponse.fail("You need to be logged in to access this."))
def get_active_system_users():
    system_users = query_read_all_active_system_users()
    if not system_users:
        return APIResponse.fail(
            "No system users found.",
        )

    return APIResponse.success(
        message="System users found.",
        data=[
            {
                "user_id": system_user.user_id,
                "username": system_user.username,
                "display_name": system_user.display_name,
                "email": system_user.email,
                "sms": system_user.sms,
                "private_key": system_user.private_key,
                "user_type": system_user.user_type,
                "created": system_user.created,
            }
            for system_user in system_users
        ],
    )


@rest.get("/get/users")
@api_login_check("logged_in", [True], APIResponse.fail("You need to be logged in to access this."))
def get_system_users():
    system_users = query_read_all_system_users()
    if not system_users:
        return APIResponse.fail(
            "No system users found.",
        )

    return APIResponse.success(
        message="System users found.",
        data=[
            {
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
            for system_user in system_users
        ],
    )
