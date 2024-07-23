from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from app.sql import GDBSession
from app.sql.queries.workshop import query_update_workshop_ticket


def update_workshop_ticket(data):
    ignored_fields = ["workshop_ticket_id", "created"]

    d = DataDict(data)
    try:
        workshop_ticket_id = d.get_ensure_key("workshop_ticket_id")
        values = d.get_ensure_key("values")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "workshop_ticket_id": "int",
                "values": "dict = {}",
            },
        )

    with GDBSession as s:
        result = s.execute(
            query_update_workshop_ticket(workshop_ticket_id, values, ignored_fields)
        ).scalar_one_or_none()

        if not result:
            return RPCResponse.fail("Error updating workshop ticket.")

        response = RPCResponse.success(
            {
                **{k: v for k, v in result.__dict__.items() if not k.startswith("_")},
            },
            "Workshop ticket updated.",
        )

        s.commit()

        return response
