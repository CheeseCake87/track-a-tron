from quart import Blueprint
from quart_rpc.version_1_0 import RPC, RPCResponse

from .funcs import __all__

user = Blueprint("user", __name__, url_prefix="/user")
rpc = RPC(user)
rpc.functions_auto_name(__all__)


@user.errorhandler(404)
@user.errorhandler(405)
def route_404(_):
    return RPCResponse.fail("Page or method not found.")
