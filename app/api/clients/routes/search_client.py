from app.decorators import limit_to_json
from app.utilities import APIResponse, condense_client_address
from .. import rest
from ..query.client import query_search_client


@rest.post("/search")
@limit_to_json
def search_(json):
    clients = query_search_client(json.get("where", {}))

    if not clients:
        return APIResponse.fail(
            "No clients found.",
        )

    return APIResponse.success(
        "Clients found.",
        [
            {
                **{
                    k: v
                    for k, v in client.__dict__.items()
                    if not k.startswith("_")
                },
                "__added_by": client.rel_system_user.display_name,
                "__address": condense_client_address(client),
                "__created": client.created.strftime("%a %-d %b")
                if client.created
                else "-",
            }
            for client in clients
        ]
    )
