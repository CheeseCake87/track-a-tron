from quart import Blueprint
from quart_rpc.version_1_1 import RPC

from .funcs import __all__

testing = Blueprint("testing", __name__, url_prefix="/testing")
rpc = RPC(testing)
rpc.functions_auto_name(__all__)
