from flask_imp.auth import generate_salt, encrypt_password, generate_email_validator
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_0 import RPCResponse

from app.sql import DBSession
from app.sql.queries.system_user import (
    query_create_system_user,
)


def create_user(data):
    d = DataDict(data)
    try:
        display_name = d.get_ensure_key("display_name")
        username = d.get_ensure_key("username")
        password = d.get_ensure_key("password")
        user_type = d.get_ensure_key("user_type")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "display_name": "string",
                "username": "string",
                "password": "string",
                "user_type": "string [user, manager, admin]",
            },
        )

    salt = generate_salt()
    password_hash = encrypt_password(password, salt)

    with DBSession as s:
        new_user_id = s.execute(
            query_create_system_user(
                display_name,
                username,
                password_hash,
                salt,
                generate_email_validator(),
                user_type,
            )
        ).scalar_one()
        s.commit()

        return RPCResponse.success(
            {
                "user_id": new_user_id,
                "display_name": display_name,
                "username": username,
                "user_type": user_type,
            },
            "User created.",
        )
