from app.decorators import limit_to_json
from app.utilities import condense_client_address, APIResponse
from flask_imp.security import api_login_check
from .. import rest
from ..query.client import query_update_client


@rest.post("/update/<int:client_id>")
@api_login_check("logged_in", [True], APIResponse.fail("You need to be logged in to access this."))
@limit_to_json
def update_(json, client_id):
    updated_client = query_update_client(client_id, json)

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
