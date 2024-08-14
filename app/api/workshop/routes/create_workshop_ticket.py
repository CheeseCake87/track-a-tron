from app.decorators import limit_to_json
from app.utilities import APIResponse
from .. import rest
from ..query.workshop_ticket import (
    query_create_workshop_ticket,
    query_create_workshop_ticket_device,
    query_create_workshop_ticket_item
)


@rest.post("/create/ticket")
@limit_to_json
def create_ticket(json):
    ticket = json.get("ticket", {})
    devices = json.get("devices", [])
    items = json.get("items", [])

    new_ticket = query_create_workshop_ticket(
        user_id=ticket.get("user_id"),
        assigned_user_id=ticket.get("assigned_user_id"),
        client_id=ticket.get("client_id"),
        category_code=ticket.get("category_code"),
        status_code=ticket.get("status_code"),
        request=ticket.get("request"),
        no_due_datetime=ticket.get("no_due_datetime"),
    )

    for device in devices:
        query_create_workshop_ticket_device(
            workshop_ticket_id=new_ticket.workshop_ticket_id,
            user_id=ticket.get("user_id"),
            type_=device.get("type"),
            make=device.get("make"),
            model=device.get("model"),
            serial_number=device.get("serial_number"),
            power_adapter_included=device.get("power_adapter_included", False),
            _auto_commit=False,
            _flush=False,
        )

    for item in items:
        query_create_workshop_ticket_item(
            workshop_ticket_id=new_ticket.workshop_ticket_id,
            user_id=ticket.get("user_id"),
            description=item.get("description"),
            _auto_commit=False,
            _flush=False,
        )

    if not new_ticket:
        return APIResponse.fail(
            "Unable to create ticket.",
        )

    return APIResponse.success(
        "Ticket created.",
        {
            "workshop_ticket_id": new_ticket.workshop_ticket_id,
            "workshop_tag": new_ticket.workshop_tag
        }
    )
