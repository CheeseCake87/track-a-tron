from quart import Blueprint
from quart_rpc.version_1_1 import RPC, RPCResponse, RPCAuthSessionKey

from .funcs import __all__

workshop = Blueprint("workshop", __name__, url_prefix="/workshop")
rpc = RPC(workshop, session_auth=RPCAuthSessionKey("logged_in", [True]))
rpc.functions_auto_name(__all__)


@workshop.errorhandler(404)
@workshop.errorhandler(405)
def route_404(_):
    return RPCResponse.fail("Page or method not found.")
