from flask_imp.auth import encrypt_password, generate_salt, generate_private_key

from app.decorators import limit_to_json
from app.utilities import APIResponse
from .. import rest
from ..query.system_user import (
    query_create_system_user,
)


@rest.post("/create/user")
@limit_to_json
def create_system_user(json):

    username = json.get("username")
    password = json.get("password")
    display_name = json.get("display_name")
    email = json.get("email")
    sms = json.get("sms")
    user_type = json.get("user_type")

    salt = generate_salt()
    hashed_password = encrypt_password(password, salt)
    private_key = generate_private_key(salt)

    system_user = query_create_system_user(
        display_name=display_name,
        username=username,
        password=hashed_password,
        salt=salt,
        private_key=private_key,
        user_type=user_type,
        email=email,
        sms=sms,
    )

    if not system_user:
        return APIResponse.fail(
            "Unable to create system user.",
        )

    return APIResponse.success(
        message="System user found.",
        data={
            "user_id": system_user,
        }
    )
