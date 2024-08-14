from app.utilities import APIResponse
from flask_imp.security import api_login_check
from .. import rest
from ..query.client import query_delete_client


@rest.get("/delete/<int:client_id>")
@api_login_check("logged_in", True, {"navigate": "/login"})
def delete_client(client_id):
    delete = query_delete_client(client_id)

    if not delete:
        return APIResponse.fail(
            "Unable to delete client.",
        )

    return APIResponse.success(
        "Client deleted.",
        client_id
    )
