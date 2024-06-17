from quart import Blueprint
from quart_rpc.version_1_0 import RPC, RPCResponse

from .funcs import login, logout, get_session

auth = Blueprint("auth", __name__, url_prefix="/auth")
rpc = RPC(auth)
rpc.functions_auto_name([login, logout, get_session])


@auth.errorhandler(404)
@auth.errorhandler(405)
def route_404(_):
    return RPCResponse.fail("Page or method not found.")
