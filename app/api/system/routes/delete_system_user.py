from app.utilities import APIResponse
from .. import rest
from ..query.system_user import (
    query_delete_system_user,
)


@rest.get("/delete/user/<string:username>/<int:user_id>")
def delete_system_user(username, user_id):
    deleted_user = query_delete_system_user(
        username=username,
        user_id=user_id,
    )

    if not deleted_user:
        return APIResponse.fail(
            "Unable to delete system user.",
        )

    return APIResponse.success(
        message="System user deleted.",
        data=deleted_user
    )
