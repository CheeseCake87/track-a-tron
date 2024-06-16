from quart import Blueprint
from quart_rpc.version_1_0 import RPCResponse

from app.services.get_address import get_address

services_rpc = Blueprint("services_rpc", __name__, url_prefix="/services/rpc")
services_rpc.register_blueprint(get_address)


@services_rpc.route("/", defaults={"path": ""}, methods=["GET", "POST"])
@services_rpc.route("/<path:path>", methods=["GET", "POST"])
async def catch_all(path):
    return RPCResponse.fail(
        "Path not found.",
        {"path": path},
    )
