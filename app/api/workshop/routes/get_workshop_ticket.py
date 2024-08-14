from app.utilities import APIResponse, condense_client_address
from .. import rest
from ..query.workshop_ticket import (
    query_read_workshop_ticket_using_pk,
    query_read_workshop_ticket_using_tag,
)


def _build_ticket_data(ticket: any):
    return {
        **{k: v for k, v in ticket.__dict__.items() if not k.startswith("_")},
        "__added_by": ticket.rel_added_by.display_name,
        "__assigned_to": ticket.rel_assigned_to.display_name if ticket.rel_assigned_to else "-",
        "__assigned_to_id": ticket.rel_assigned_to.user_id if ticket.rel_assigned_to else "-",
        "__client": {
            "client_id": ticket.rel_client.client_id,
            "business_name": ticket.rel_client.business_name,
            "first_name": ticket.rel_client.first_name,
            "last_name": ticket.rel_client.last_name,
            "phone": ticket.rel_client.phone,
            "email_address": ticket.rel_client.email_address,
            "alt_phone": ticket.rel_client.alt_phone,
            "alt_email_address": ticket.rel_client.alt_email_address,
            "__address": condense_client_address(ticket.rel_client),
        },
        "__devices": [
            {
                "workshop_ticket_device_id": d.workshop_ticket_device_id,
                "type": d.type,
                "make": d.make,
                "model": d.model,
                "password": d.password,
            }
            for d in ticket.rel_devices
        ],
        "__items": [
            {
                "workshop_ticket_item_id": d.workshop_ticket_item_id,
                "description": d.description,
            }
            for d in ticket.rel_items
        ],
        "__notes": [
            {
                "workshop_ticket_note_id": d.workshop_ticket_note_id,
                "fk_user_id": d.fk_user_id,
                "text_note": d.note,
                "__added_by": d.rel_added_by.display_name if d.rel_added_by else "-",
                "__created": d.created.strftime("%a %-d %b") if d.created else "-",
            }
            for d in ticket.rel_notes
        ],
        "__created": ticket.created.strftime("%a %-d %b") if ticket.created else "-",
    }


@rest.get("/ticket/tag/<string:workshop_tag>")
def get_workshop_ticket_using_tag(workshop_tag):
    ticket = query_read_workshop_ticket_using_tag(workshop_tag)
    if not ticket:
        return APIResponse.fail(
            "Ticket not found.",
        )

    return APIResponse.success(
        "Ticket found.",
        _build_ticket_data(ticket),
    )


@rest.get("/ticket/<int:workshop_ticket_id>")
def get_workshop_ticket_using_pk(workshop_ticket_id):
    ticket = query_read_workshop_ticket_using_pk(workshop_ticket_id)
    if not ticket:
        return APIResponse.fail(
            "Ticket not found.",
        )

    return APIResponse.success(
        "Ticket found.",
        _build_ticket_data(ticket),
    )
