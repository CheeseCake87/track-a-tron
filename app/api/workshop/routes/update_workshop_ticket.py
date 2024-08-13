from app.decorators import limit_to_json
from app.utilities import APIResponse
from .. import rest
from ..query.workshop_ticket import query_update_workshop_ticket


def _build_ticket_data(ticket: any):
    return {
        **{k: v for k, v in ticket.__dict__.items() if not k.startswith("_")},
        "__added_by": ticket.rel_added_by.display_name,
        "__assigned_to": ticket.rel_assigned_to.display_name,
        "__assigned_to_id": ticket.rel_assigned_to.user_id,
        "__created": ticket.created.strftime("%a %-d %b") if ticket.created else "-",
    }


@rest.post("/update/ticket/<int:workshop_ticket_id>")
@limit_to_json
def update_workshop_ticket(json, workshop_ticket_id):
    update_ticket = query_update_workshop_ticket(workshop_ticket_id, json.data)
    if not update_ticket:
        return APIResponse.fail(
            "Unable to update ticket.",
        )

    return APIResponse.success(
        "Ticket found.",
        _build_ticket_data(update_ticket),
    )
