from app.utilities import APIResponse
from flask_imp.security import api_login_check
from .. import rest
from ..query.workshop_ticket import (
    query_read_workshop_ticket_notes,
)


@rest.get("/get/ticket/<int:workshop_ticket_id>/notes")
@api_login_check("logged_in", True, {"navigate": "/login"})
def get_workshop_ticket_notes(workshop_ticket_id):
    notes = query_read_workshop_ticket_notes(workshop_ticket_id)
    if not notes:
        return APIResponse.fail(
            "Notes not found.",
        )

    return APIResponse.success(
        "Notes found.",
        [
            {
                "workshop_ticket_note_id": note.workshop_ticket_note_id,
                "fk_user_id": note.fk_user_id,
                "text_note": note.text_note,
                "__added_by": note.rel_added_by.display_name
                if note.rel_added_by
                else "-",
                "__created": note.created.strftime("%a %-d %b")
                if note.created
                else "-",
            }
            for note in notes
        ]
    )
