from app.decorators import limit_to_json
from app.utilities import APIResponse
from .. import rest
from ..query.workshop_ticket import query_all_paged


@rest.post("/paged")
@limit_to_json
def paged(json):
    data = json.data
    limit = data.get("limit", 10)
    page = data.get("page", 1)
    where = data.get("where", {})

    tickets, ticket_count, pages = query_all_paged(limit=limit, page=page, where=where)

    return APIResponse.success(
        "Paged Tickets",
        {
            "total_tickets": ticket_count,
            "total_pages": pages,
            "page": page,
            "limit": limit,
            "tickets": [
                {
                    **{k: v for k, v in row.__dict__.items() if not k.startswith("_")},
                    "__added_by": row.rel_added_by.display_name,
                    "__assigned_to": row.rel_assigned_to.display_name,
                    "__client": {
                        "client_id": row.rel_client.client_id,
                        "business_name": row.rel_client.business_name,
                        "first_name": row.rel_client.first_name,
                        "last_name": row.rel_client.last_name,
                        "phone": row.rel_client.phone,
                        "email_address": row.rel_client.email_address,
                        "alt_phone": row.rel_client.alt_phone,
                        "alt_email_address": row.rel_client.alt_email_address,
                    },
                    "__devices": [
                        {
                            "type": d.type,
                            "make": d.make,
                            "model": d.model,
                        }
                        for d in row.rel_devices
                    ],
                    "__items": [
                        {
                            "description": d.description,
                        }
                        for d in row.rel_items
                    ],
                    "__created": row.created.strftime("%a %-d %b")
                    if row.created
                    else "-",
                }
                for row in tickets
            ],
        },
    )
