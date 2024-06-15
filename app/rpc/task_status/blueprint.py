from quart import Blueprint
from quart_rpc.version_1_0 import RPC, RPCResponse

from .funcs import __all__ as funcs

status = Blueprint("status", __name__, url_prefix="/status")
rpc = RPC(status)
rpc.functions_auto_name(funcs)


@status.errorhandler(404)
@status.errorhandler(405)
def route_404(_):
    return RPCResponse.fail("Page or method not found.")
