from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse  # noqa

from app.sql import GDBSession
from app.sql.queries.workshop import (
    query_create_workshop_ticket,
    query_count_workshop_tickets,
    query_create_workshop_ticket_device,
    query_create_workshop_ticket_item,
)


def create_workshop_ticket(data):
    d = DataDict(data)
    try:
        user_id = d.get_ensure_key("user_id")
        assigned_user_id = d.get_ensure_key("assigned_user_id")
        client_id = d.get_ensure_key("client_id")
        category_code = d.get_ensure_key("category_code")
        status_code = d.get_ensure_key("status_code")
        request = d.get_ensure_key("request")
        devices = d.get_ensure_key("devices")
        items = d.get_ensure_key("items")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "user_id": "int",
                "assigned_user_id": "int",
                "client_id": "int",
                "category_code": "int",
                "status_code": "int",
                "request": "str",
                "devices": "list[dict]",
                "items": "list[dict]",
            },
        )

    with GDBSession as s:
        count_tickets = s.execute(query_count_workshop_tickets()).scalar()

        workshop_tag = f"{count_tickets + 1}-{client_id}"

        new_ticket = s.execute(
            query_create_workshop_ticket(
                user_id,
                assigned_user_id,
                client_id,
                workshop_tag,
                category_code,
                status_code,
                request,
                no_due_datetime=data.get("no_due_datetime", True),
                due_datetime=data.get("due_datetime", None),
            )
        ).scalar_one_or_none()

        s.flush()

        for device in devices:
            s.execute(
                query_create_workshop_ticket_device(
                    new_ticket.ticket_id,
                    user_id,
                    type_=device.get("type"),
                    make=device.get("make"),
                    model=device.get("model"),
                    serial_number=device.get("serial_number"),
                    power_adapter_included=device.get("power_adapter_included", False),
                    additional_info=device.get("additional_info"),
                )
            )

        for item in items:
            s.execute(
                query_create_workshop_ticket_item(
                    new_ticket.ticket_id,
                    user_id,
                    description=item.get("description"),
                )
            )

        s.commit()

        response = RPCResponse.success(
            {"workshop_ticket_id": new_ticket.ticket_id},
            "Workshop ticket created.",
        )

        return response
