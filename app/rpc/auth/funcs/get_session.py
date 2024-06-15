from quart import session
from quart_rpc.version_1_0 import RPCResponse


def get_session(_):
    """
    Return session data to the frontend.
    """
    return RPCResponse.success(
        {k: v for k, v in session.items() if not k.startswith("_")},
        "Session retrieved.",
    )
