from quart import Blueprint
from quart_rpc.version_1_1 import RPCResponse

from backend.rpc.auth import auth
from backend.rpc.client import client
from backend.rpc.system import system
from backend.rpc.testing import testing

# Services
from backend.services.get_address.rpc import get_address

rpc = Blueprint("rpc", __name__, url_prefix="/rpc")
rpc.register_blueprint(auth)
rpc.register_blueprint(client)
rpc.register_blueprint(testing)
rpc.register_blueprint(system)

# Services
rpc.register_blueprint(get_address)


@rpc.route("/", defaults={"path": ""}, methods=["GET", "POST"])
@rpc.route("/<path:path>", methods=["GET", "POST"])
async def catch_all(path):
    return RPCResponse.fail(
        "Path not found.",
        {"path": path},
    )
