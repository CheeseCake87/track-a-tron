from quart import session
from quart_rpc.version_1_1 import RPCResponse


def force_login(_):
    session["logged_in"] = True
    session["user_id"] = 1
    session["user_type"] = "admin"

    return RPCResponse.success(
        {
            "logged_in": True,
            "user_id": 1,
            "user_type": "admin",
        },
        "Logged in.",
    )
