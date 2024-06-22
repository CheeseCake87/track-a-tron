from typing import Union

from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from app.sql import GDBSession
from app.sql.queries.client import query_page_clients, query_count_clients
from app.sql.queries.system_user import query_read_system_user
from app.sql.tables import Client


def build_address(result: Client) -> Union[list, str]:
    address_values = [
        result.building_name,
        result.sub_building_name,
        result.building_number,
        result.sub_building_number,
        result.address_line_1,
        result.address_line_2,
        result.address_line_3,
        result.locality,
        result.town_or_city,
        result.county,
        result.district,
        result.postcode,
        result.country,
    ]
    address = ", ".join([v for v in address_values if v])
    if not address:
        return "-"
    return address


def page_clients(data):
    d = DataDict(data)
    try:
        user_id = d.get_ensure_key("user_id")
        page = d.get_ensure_key("page")
        limit = d.get_ensure_key("limit")
        where = d.get_ensure_key("where")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "user_id": "int",
                "page": "int = 1",
                "limit": "int = 10",
                "where": "dict = {}",
            },
        )

    with GDBSession as s:
        user = s.execute(
            query_read_system_user({"user_id": user_id})
        ).scalar_one_or_none()

        if not user:
            print(f"User not found: {user_id}")
            return RPCResponse.fail("User not found.")

        result = s.execute(query_page_clients(where, limit, page)).scalars().all()

        total_clients = s.execute(query_count_clients(where)).scalar()

        total_pages = total_clients // limit + 1

        response = RPCResponse.success(
            {
                "total_clients": total_clients,
                "total_pages": total_pages,
                "page": page,
                "limit": limit,
                "clients": [
                    {
                        **{
                            k: v for k, v in r.__dict__.items() if not k.startswith("_")
                        },
                        "__address": build_address(r),
                        "__created": r.created.strftime("%a %-d %b") if r.created else "-",
                    }
                    for r in result
                ],
            },
            "Clients found.",
        )

        return response
