from app.utilities import APIResponse
from flask_imp.security import api_login_check
from .. import rest
from ..query.workshop_ticket import (
    query_delete_workshop_ticket_note,
)


@rest.get("/ticket/delete/<int:workshop_ticket_id>")
@api_login_check("logged_in", [True], APIResponse.fail("You need to be logged in to access this."))
def delete_workshop_ticket(workshop_ticket_id):
    query_delete_workshop_ticket_note(workshop_ticket_id)

    return APIResponse.success(
        "Ticket deleted.",
        {"workshop_ticket_id": workshop_ticket_id}
    )
