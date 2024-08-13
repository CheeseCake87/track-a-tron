from app.decorators import limit_to_json
from app.utilities import condense_client_address, APIResponse
from .. import rest
from ..query.client import query_update_client


@rest.post("/update/<int:client_id>")
@limit_to_json
def update_(json, client_id):
    data = json.data
    updated_client = query_update_client(client_id, data)

    if not updated_client:
        return APIResponse.fail(
            "Client not found.",
        )

    return APIResponse.success(
        "Client updated.",
        {
            **{
                k: v
                for k, v in updated_client.__dict__.items()
                if not k.startswith("_")
            },
            "__added_by": updated_client.rel_system_user.display_name,
            "__address": condense_client_address(updated_client),
            "__created": updated_client.created.strftime("%a %-d %b"),
        },
    )
    pass
