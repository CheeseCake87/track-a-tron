from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from app.sql import GDBSession
from app.sql.queries.workshop import query_page_workshop_tickets
from app.sql.queries.system_user import query_read_system_user


def page_workshop_tickets(data):
    d = DataDict(data)
    try:
        user_id = d.get_ensure_key("user_id")
        page = d.get_ensure_key("page")
        limit = d.get_ensure_key("limit")
        where = d.get_ensure_key("where")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "user_id": "int",
                "page": "int = 1",
                "limit": "int = 10",
                "where": "dict = {}",
            },
        )

    with GDBSession as s:
        user = s.execute(
            query_read_system_user({"user_id": user_id})
        ).scalar_one_or_none()

        if not user:
            print(f"User not found: {user_id}")
            return RPCResponse.fail("User not found.")

        result_query, count_query = query_page_workshop_tickets(where, limit, page)

        result = s.execute(result_query).scalars().all()
        total_tickets = s.execute(count_query).scalar()

        total_pages = total_tickets // limit + 1

        response = RPCResponse.success(
            {
                "total_tickets": total_tickets,
                "total_pages": total_pages,
                "page": page,
                "limit": limit,
                "tickets": [
                    {
                        **{
                            k: v for k, v in r.__dict__.items() if not k.startswith("_")
                        },
                        "__created": r.created.strftime("%a %-d %b")
                        if r.created
                        else "-",
                    }
                    for r in result
                ],
            },
            "Tickets found.",
        )

        return response
