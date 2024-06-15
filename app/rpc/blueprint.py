from quart import Blueprint
from quart_rpc.version_1_0 import RPCResponse

from app.rpc.auth import auth
from app.rpc.client import client
from app.rpc.setup import setup
from app.rpc.task_status import status
from app.rpc.testing import testing
from app.rpc.user import user

rpc = Blueprint("rpc", __name__, url_prefix="/rpc")
rpc.register_blueprint(auth)
rpc.register_blueprint(client)
rpc.register_blueprint(setup)
rpc.register_blueprint(user)
rpc.register_blueprint(status)
rpc.register_blueprint(testing)


@rpc.route("/", defaults={"path": ""}, methods=["GET", "POST"])
@rpc.route("/<path:path>", methods=["GET", "POST"])
async def catch_all(path):
    return RPCResponse.fail(
        "Path not found.",
        {"path": path},
    )
