from quart import session
from quart_rpc.version_1_1 import RPCResponse


def logout(_):
    session["logged_in"] = False
    session["user_id"] = None

    return RPCResponse.success(None, "logged out.")
