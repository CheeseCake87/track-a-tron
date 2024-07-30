from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse  # noqa

from app.sql import GDBSession
from app.sql.queries.workshop import (
    query_delete_workshop_ticket_note
)


def delete_workshop_ticket_note(data):
    d = DataDict(data)
    try:
        workshop_ticket_note_id = d.get_ensure_key("workshop_ticket_note_id")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "workshop_ticket_note_id": "int",
            },
        )

    with GDBSession as s:
        s.execute(
            query_delete_workshop_ticket_note(
                workshop_ticket_note_id=workshop_ticket_note_id,
            )
        )

        s.commit()

        response = RPCResponse.success(
            {"workshop_ticket_note_id": workshop_ticket_note_id},
            "Workshop ticket note deleted.",
        )

        return response
