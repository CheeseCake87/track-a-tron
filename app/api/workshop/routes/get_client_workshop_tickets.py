from app.utilities import APIResponse, condense_client_address
from flask_imp.security import api_login_check
from .. import rest
from ..query.workshop_ticket import query_read_workshop_ticket_using_client_id


@rest.get("/get/client/<int:client_id>/tickets")
@api_login_check("logged_in", True, {"navigate": "/login"})
def get_client_workshop_tickets(client_id):
    tickets = query_read_workshop_ticket_using_client_id(client_id)
    if not tickets:
        return APIResponse.fail(
            "Tickets not found.",
        )

    return APIResponse.success(
        "Tickets found.",
        [
            {
                **{k: v for k, v in ticket.__dict__.items() if not k.startswith("_")},
                "__added_by": ticket.rel_added_by.display_name,
                "__assigned_to": ticket.rel_assigned_to.display_name,
                "__assigned_to_id": ticket.rel_assigned_to.user_id,
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
                "__created": ticket.created.strftime("%a %-d %b")
                if ticket.created
                else "-",
            }
            for ticket in tickets
        ],
    )
