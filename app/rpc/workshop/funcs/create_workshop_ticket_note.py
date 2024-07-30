from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse  # noqa

from app.sql import GDBSession
from app.sql.queries.workshop import (
    query_create_workshop_ticket_note,
)


def create_workshop_ticket_note(data):
    d = DataDict(data)
    try:
        workshop_ticket_id = d.get_ensure_key("workshop_ticket_id")
        user_id = d.get_ensure_key("user_id")
        note = d.get_ensure_key("note")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "workshop_ticket_id": "int",
                "user_id": "int",
                "note": "str",
            },
        )

    with GDBSession as s:
        new_ticket_note = s.execute(
            query_create_workshop_ticket_note(
                workshop_ticket_id=workshop_ticket_id,
                user_id=user_id,
                text_note=note,
            )
        ).scalar_one_or_none()

        s.commit()

        response = RPCResponse.success(
            {"workshop_ticket_note_id": new_ticket_note.workshop_ticket_note_id},
            "Workshop ticket note created.",
        )

        return response
