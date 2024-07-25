from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse  # noqa

from app.sql import GDBSession
from app.sql.queries.workshop import query_read_workshop_ticket


def get_workshop_ticket(data):
    d = DataDict(data)
    try:
        where = d.get_ensure_key("where")
    except DataException:
        return RPCResponse.fail("Missing required data.", {"where": "{field: value}"})

    with GDBSession as s:
        query = query_read_workshop_ticket(where)

        if query is None:
            return RPCResponse.fail(
                "No valid where clause provided.", {"where": "{field: value}"}
            )

        r = s.execute(query).scalar_one_or_none()
        if not r:
            return RPCResponse.fail("No workshop ticket found.")

        return RPCResponse.success(
            {
                **{k: v for k, v in r.__dict__.items() if not k.startswith("_")},
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
                "__created": r.created.strftime("%a %-d %b") if r.created else "-",
            },
            "Workshop ticket found.",
        )
