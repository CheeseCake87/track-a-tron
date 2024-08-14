from app.utilities import APIResponse
from .. import rest
from ..query.client import query_delete_client


@rest.get("/delete/<int:client_id>")
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
