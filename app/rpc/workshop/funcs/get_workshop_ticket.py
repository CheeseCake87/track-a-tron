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

        result = s.execute(query).scalar_one_or_none()
        if not result:
            return RPCResponse.fail("No workshop ticket found.")

        return RPCResponse.success(
            {
                **{k: v for k, v in result.__dict__.items() if not k.startswith("_")},
                "__added_by": result.rel_added_by.display_name,
                "__assigned_to": result.rel_assigned_to.display_name,
                "__created": result.created.strftime("%a %-d %b")
                if result.created
                else "-",
            },
            "Workshop ticket found.",
        )
