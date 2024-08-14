from app.utilities import APIResponse
from flask_imp.security import api_login_check
from .. import rest
from ..query.system_log import query_read_all_system_logs


@rest.get("/get/logs")
@api_login_check("logged_in", [True], APIResponse.fail("You need to be logged in to access this."))
def get_logs():
    system_logs = query_read_all_system_logs()

    if not system_logs:
        return APIResponse.fail(
            "No system logs found.",
        )

    return APIResponse.success(
        message="System users found.",
        data=[
            {
                "subject": system_log.user_id,
                "log": system_log.username,
                "__created": system_log.created.strftime("%a %-d %b"),
            }
            for system_log in system_logs
        ],
    )
