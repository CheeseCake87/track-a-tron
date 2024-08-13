from app.utilities import APIResponse
from .. import rest
from ..query.workshop_ticket import (
    query_delete_workshop_ticket_note,
)


@rest.post("/ticket/delete/note/<int:workshop_ticket_note_id>")
def delete_workshop_ticket_note(workshop_ticket_note_id):
    query_delete_workshop_ticket_note(workshop_ticket_note_id)

    return APIResponse.success(
        "Note deleted.",
        {"workshop_ticket_note_id": workshop_ticket_note_id}
    )
