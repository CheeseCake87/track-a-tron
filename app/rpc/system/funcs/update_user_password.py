from flask_imp.auth import generate_salt, encrypt_password
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from app.sql import GDBSession
from app.sql.queries.system_user import (
    query_update_system_user,
)


def update_user_password(data):
    d = DataDict(data)
    try:
        user_id = d.get_ensure_key("user_id")
        password = d.get_ensure_key("password")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "user_id": "int",
                "password": "str",
            },
        )

    salt = generate_salt()
    password_hash = encrypt_password(password, salt)

    with GDBSession as s:
        result = s.execute(
            query_update_system_user(
                user_id,
                {"password": password_hash, "salt": salt}
            )
        ).scalar_one_or_none()

        if not result:
            return RPCResponse.fail("No user found.")

        response = RPCResponse.success(
            {
                "user_id": result.user_id,
                "display_name": result.display_name,
                "username": result.username,
                "user_type": result.user_type,
            },
            "Password updated.",
        )

        s.commit()

        return response
