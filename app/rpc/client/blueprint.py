from quart import Blueprint
from quart_rpc.version_1_0 import RPC, RPCResponse

from .funcs import __all__

client = Blueprint("client", __name__, url_prefix="/client")
rpc = RPC(client)
rpc.functions_auto_name(__all__)


@client.errorhandler(404)
@client.errorhandler(405)
def route_404(_):
    return RPCResponse.fail("Page or method not found.")
