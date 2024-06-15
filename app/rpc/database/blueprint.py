from quart import Blueprint
from quart_rpc.version_1_0 import RPC, RPCResponse

from .funcs import __all__ as funcs

database = Blueprint("database", __name__, url_prefix="/database")
rpc = RPC(database)
rpc.functions_auto_name(funcs)


@database.errorhandler(404)
@database.errorhandler(405)
def route_404(_):
    return RPCResponse.fail("Page or method not found.")
