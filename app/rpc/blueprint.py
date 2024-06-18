from quart import Blueprint
from quart_rpc.version_1_0 import RPCResponse

from app.rpc.auth import auth
from app.rpc.client import client
from app.rpc.setup import setup
from app.rpc.system import system
from app.rpc.testing import testing

# Services
from app.services.get_address.rpc import get_address

rpc = Blueprint("rpc", __name__, url_prefix="/rpc")
rpc.register_blueprint(auth)
rpc.register_blueprint(client)
rpc.register_blueprint(setup)
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
