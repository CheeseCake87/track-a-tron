from quart import Blueprint
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_0 import RPC, RPCResponse  # noqa

from app.services.get_address import GetAddressService

get_address = Blueprint("get_address", __name__, url_prefix="/services/get_address")

rpc = RPC(get_address)


def find(data):
    d = DataDict(data)
    try:
        postcode = d.get_ensure_key("postcode")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "postcode": "str",
            },
        )

    get_address_service = GetAddressService()
    successful, message, data = get_address_service.find(postcode)

    if not successful:
        return RPCResponse.fail(message, data)

    return RPCResponse.success(data, message)


def cache_find(data):
    d = DataDict(data)
    try:
        postcode = d.get_ensure_key("postcode")
        refresh = d.get_ensure_key("refresh")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "postcode": "str",
                "refresh": "bool",
            },
        )

    get_address_service = GetAddressService()
    successful, message, data = get_address_service.cache_find(postcode, refresh)

    if not successful:
        return RPCResponse.fail(message, data)
    return RPCResponse.success(data, message)


rpc.functions_auto_name([find, cache_find])
