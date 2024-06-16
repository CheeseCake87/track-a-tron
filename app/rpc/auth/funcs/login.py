from quart import session
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_0 import RPCResponse

from app.sql.queries.user import (
    query_read_user_by_username,
)
from app.sql.sessions import DBSession
from flask_imp.auth import authenticate_password


def login(data):
    d = DataDict(data)
    try:
        username = d.get_ensure_key("username")
        password = d.get_ensure_key("password")
    except DataException as error:
        return RPCResponse.fail(str(error))

    with DBSession as s:
        user = s.execute(query_read_user_by_username(username)).scalar_one_or_none()

        if user is None:
            return RPCResponse.fail("User not found.")

        if not authenticate_password(password, user.password, user.salt):
            return RPCResponse.fail("Invalid password.")

        session["logged_in"] = True
        session["user_id"] = user.user_id
        session["user_type"] = user.user_type

    return RPCResponse.success(
        {
            "logged_in": True,
            "user_id": user.user_id,
            "user_type": user.user_type,
        },
        "Logged in.",
    )
