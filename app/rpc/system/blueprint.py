from quart import Blueprint
from quart_rpc.version_1_1 import RPC, RPCResponse, RPCAuthSessionKey

import app.rpc.system.funcs as funcs

system = Blueprint("system", __name__, url_prefix="/system")

rpc = RPC(system)
rpc.functions_auto_name([funcs.check_if_setup, funcs.install])
rpc.functions_auto_name(
    session_auth__=[
        RPCAuthSessionKey("logged_in", [True]),
        RPCAuthSessionKey("user_type", ["admin"]),
    ],
    functions=[
        funcs.create_user,
        funcs.get_all_users,
        funcs.get_all_active_users,
        funcs.get_enabled_services,
        funcs.get_services,
        funcs.get_user,
        funcs.update_service,
        funcs.update_user,
        funcs.delete_user,
        funcs.update_user_password,
        funcs.change_user_password,
        funcs.get_logs,
    ],
)


@system.errorhandler(404)
@system.errorhandler(405)
def route_404(_):
    return RPCResponse.fail("Page or method not found.")
