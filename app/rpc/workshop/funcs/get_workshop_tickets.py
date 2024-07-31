from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from sqlalchemy import Select

from app.sql import GDBSession
from app.sql.queries.workshop import query_read_workshop_ticket


def get_workshop_tickets(data):
    d = DataDict(data)
    try:
        where = d.get_ensure_key("where")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "where": "dict = {}",
            },
        )

    with GDBSession as s:
        result_query = query_read_workshop_ticket(where)

        if not isinstance(result_query, Select):
            return RPCResponse.fail(
                "No tickets found.",
                [],
            )

        result = s.execute(result_query).scalars().all()

        response = RPCResponse.success(
            [
                {
                    **{
                        k: v for k, v in r.__dict__.items() if not k.startswith("_")
                    },
                    "__added_by": r.rel_added_by.display_name,
                    "__assigned_to": r.rel_assigned_to.display_name,
                    "__client": {
                        "client_id": r.rel_client.client_id,
                        "business_name": r.rel_client.business_name,
                        "first_name": r.rel_client.first_name,
                        "last_name": r.rel_client.last_name,
                        "phone": r.rel_client.phone,
                        "email_address": r.rel_client.email_address,
                        "alt_phone": r.rel_client.alt_phone,
                        "alt_email_address": r.rel_client.alt_email_address,
                    },
                    "__devices": [
                        {
                            "type": d.type,
                            "make": d.make,
                            "model": d.model,
                        }
                        for d in r.rel_devices
                    ],
                    "__items": [
                        {
                            "description": d.description,
                        }
                        for d in r.rel_items
                    ],
                    "__created": r.created.strftime("%a %-d %b")
                    if r.created
                    else "-",
                }
                for r in result
            ],
            "Tickets found.",
        )

        return response

