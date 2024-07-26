from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse  # noqa

from app.sql import GDBSession
from app.sql.queries.client import query_read_client
from app.utilities.condense_client_address import condense_client_address


def find_client(data):
    d = DataDict(data)
    try:
        where: dict = d.get_ensure_key("where")
    except DataException:
        return RPCResponse.fail("Missing required data.", {"where": "{field: value}"})

    with GDBSession as s:
        query = query_read_client(where)

        if query is None:
            return RPCResponse.fail(
                "No valid where clause provided.", {"where": "{field: value}"}
            )

        result = s.execute(query).scalars().all()
        if not result:
            return RPCResponse.fail("No client found.")

        return RPCResponse.success(
            [
                {
                    **{k: v for k, v in r.__dict__.items() if not k.startswith("_")},
                    "__added_by": r.rel_system_user.display_name,
                    "__address": condense_client_address(r),
                    "__created": r.created.strftime("%a %-d %b") if r.created else "-",
                }
                for r in result
            ],
            "Client found.",
        )
