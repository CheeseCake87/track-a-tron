from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse  # noqa

from app.sql import GDBSession
from app.sql.queries.workshop import query_read_workshop_ticket_notes


def get_workshop_ticket_notes(data):
    d = DataDict(data)
    try:
        workshop_ticket_id = d.get_ensure_key("workshop_ticket_id")
    except DataException:
        return RPCResponse.fail("Missing required data.", {"workshop_ticket_id": "int"})

    with GDBSession as s:
        query = query_read_workshop_ticket_notes(workshop_ticket_id)

        result = s.execute(query).scalars().all()

        return RPCResponse.success(
            {
                "notes": [
                    {
                        "workshop_ticket_note_id": r.workshop_ticket_note_id,
                        "fk_user_id": r.fk_user_id,
                        "text_note": r.text_note,
                        "created": r.created,
                        "__added_by": r.rel_added_by.display_name if r.rel_added_by else "-",
                        "__created": r.created.strftime("%a %-d %b") if r.created else "-",
                    }
                    for r in result
                ],
            },
            "Workshop notes found.",
        )
