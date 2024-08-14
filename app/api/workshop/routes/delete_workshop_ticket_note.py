from app.utilities import APIResponse
from flask_imp.security import api_login_check
from .. import rest
from ..query.workshop_ticket import (
    query_delete_workshop_ticket_note,
)


@rest.get("/ticket/delete/note/<int:workshop_ticket_note_id>")
@api_login_check("logged_in", [True], APIResponse.fail("You need to be logged in to access this."))
def delete_workshop_ticket_note(workshop_ticket_note_id):
    query_delete_workshop_ticket_note(workshop_ticket_note_id)

    return APIResponse.success(
        "Note deleted.",
        {"workshop_ticket_note_id": workshop_ticket_note_id}
    )
