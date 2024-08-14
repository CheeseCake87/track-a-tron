from app.decorators import limit_to_json
from app.utilities import APIResponse
from flask_imp.auth import authenticate_password, encrypt_password, generate_salt
from .. import rest
from ..query.system_user import (
    query_read_system_user_by_user_id,
    query_update_system_user_password,
)


@rest.get("/update/user/<int:user_id>/password")
@limit_to_json
def update_system_user_password(json, user_id):

    current_password = json.get("current_password")
    new_password = json.get("new_password")
    forced = json.get("forced", False)

    if not forced:
        system_user = query_read_system_user_by_user_id(user_id=user_id)

        if not authenticate_password(current_password, system_user.password, system_user.salt):
            return APIResponse.fail("Invalid current password.")

    salt = generate_salt()
    password_hash = encrypt_password(new_password, salt)

    updated_system_user = query_update_system_user_password(
        user_id=user_id,
        password=password_hash,
        salt=salt,
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
