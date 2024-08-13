from app.decorators import limit_to_json
from app.utilities import APIResponse
from .. import rest
from ..query.workshop_ticket import (
    query_create_workshop_ticket_note,
)


@rest.post("/ticket/<int:workshop_ticket_id>/add/note")
@limit_to_json
def add_workshop_ticket_note(json, workshop_ticket_id):
    data = json.data
    user_id = data.get("user_id")
    text_note = data.get("text_note")
    new_note = query_create_workshop_ticket_note(workshop_ticket_id, user_id, text_note)

    if not new_note:
        return APIResponse.fail(
            "Unable to add note.",
        )

    return APIResponse.success(
        "New note added.",
        {
            "workshop_ticket_note_id": new_note.workshop_ticket_note_id,
            "fk_user_id": new_note.fk_user_id,
            "text_note": new_note.text_note,
            "__added_by": new_note.rel_added_by.display_name
            if new_note.rel_added_by
            else "-",
            "__created": new_note.created.strftime("%a %-d %b")
            if new_note.created
            else "-",
        }
    )