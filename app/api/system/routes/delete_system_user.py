from app.utilities import APIResponse
from flask_imp.security import api_login_check
from .. import rest
from ..query.system_user import (
    query_delete_system_user,
)


@rest.get("/delete/user/<string:username>/<int:user_id>")
@api_login_check("logged_in", [True], APIResponse.fail("You need to be logged in to access this."))
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
