from app.decorators import limit_to_json
from app.utilities import APIResponse, condense_client_address
from .. import rest
from ..query.client import query_create_client


@rest.post("/create")
@limit_to_json
def create_client(json):
    new_client = query_create_client(json.data)

    if not new_client:
        return APIResponse.fail(
            "Unable to create client.",
        )

    return APIResponse.success(
        "Client created.",
        {
            **{
                k: v
                for k, v in new_client.__dict__.items()
                if not k.startswith("_")
            },
            "__added_by": new_client.rel_system_user.display_name,
            "__address": condense_client_address(new_client),
            "__created": new_client.created.strftime("%a %-d %b")
            if new_client.created
            else "-",
        }

    )
