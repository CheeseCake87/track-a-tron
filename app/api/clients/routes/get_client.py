from app.utilities import APIResponse, condense_client_address
from flask_imp.security import api_login_check
from .. import rest
from ..query.client import query_read_client_using_client_id


@rest.get("/get/<int:client_id>")
@api_login_check("logged_in", [True], APIResponse.fail("You need to be logged in to access this."))
def get_(client_id):
    client = query_read_client_using_client_id(client_id)
    if not client:
        return APIResponse.fail(
            "Client not found.",
        )

    return APIResponse.success(
        "Client found.",
        {
            **{k: v for k, v in client.__dict__.items() if not k.startswith("_")},
            "__added_by": client.rel_system_user.display_name if client.rel_system_user else "-",
            "__address": condense_client_address(client),
            "__created": client.created.strftime("%a %-d %b") if client.created else "-",
        },
    )
