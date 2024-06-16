from quart import Blueprint
from quart_rpc.version_1_0 import RPC, RPCResponse

from .funcs import __all__ as funcs

system = Blueprint("system", __name__, url_prefix="/system")
rpc = RPC(system)
rpc.functions_auto_name(funcs)

print(rpc.LOOKUP)

@system.errorhandler(404)
@system.errorhandler(405)
def route_404(_):
    return RPCResponse.fail("Page or method not found.")
