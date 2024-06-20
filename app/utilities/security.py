from functools import wraps

from quart import session
from quart_rpc.version_1_1 import RPCResponse


def session_check(key, valid_value):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            return (
                func(*args, **kwargs)
                if session.get(key) == valid_value
                else RPCResponse.fail("Invalid security.")
            )

        return wrapper

    return decorator


__all__ = ["session_check"]
