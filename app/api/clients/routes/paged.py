from app.decorators import limit_to_json
from app.utilities import APIResponse, condense_client_address
from .. import rest
from ..query.client import query_all_paged


@rest.post("/paged")
@limit_to_json
def paged(json):
    limit = json.get("limit", 10)
    page = json.get("page", 1)
    where = json.get("where", {})

    clients, client_count, pages = query_all_paged(limit=limit, page=page, where=where)

    return APIResponse.success(
        "Paged clients",
        {
            "total_clients": client_count,
            "total_pages": pages,
            "page": page,
            "limit": limit,
            "clients": [
                {
                    **{k: v for k, v in row.__dict__.items() if not k.startswith("_")},
                    "__address": condense_client_address(row, return_short=True),
                    "__added_by": row.rel_system_user.display_name
                    if row.rel_system_user
                    else "-",
                    "__created": row.created.strftime("%a %-d %b")
                    if row.created
                    else "-",
                }
                for row in clients
            ],
        },
    )
