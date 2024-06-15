from quart import Blueprint
from quart_rpc.version_1_0 import RPC, RPCResponse

from .funcs import __all__ as funcs

setup = Blueprint("setup", __name__, url_prefix="/setup")
rpc = RPC(setup)
rpc.functions_auto_name(funcs)


@setup.errorhandler(404)
@setup.errorhandler(405)
def route_404(_):
    return RPCResponse.fail("Page or method not found.")
