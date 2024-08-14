from app.utilities import APIResponse
from .. import rest
from ..query.workshop_ticket import (
    query_delete_workshop_ticket_note,
)


@rest.post("/ticket/delete/<int:workshop_ticket_id>")
def delete_workshop_ticket(workshop_ticket_id):
    query_delete_workshop_ticket_note(workshop_ticket_id)

    return APIResponse.success(
        "Ticket deleted.",
        {"workshop_ticket_id": workshop_ticket_id}
    )
