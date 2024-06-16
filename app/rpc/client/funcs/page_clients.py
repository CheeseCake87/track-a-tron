from quart_rpc.version_1_0 import RPCResponse

from app.rpc.security import session_check
from app.sql import DBSession
from app.sql.queries.client import query_page_clients, query_count_clients
from app.sql.queries.user import query_read_user
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict


@session_check("logged_in", True)
def page_clients(data):
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

    with DBSession as s:
        user = s.execute(query_read_user({"user_id": user_id})).scalar_one_or_none()

        if not user:
            print(f"User not found: {user_id}")
            return RPCResponse.fail("User not found.")

        result = s.execute(query_page_clients(where, limit, page)).scalars().all()

        total_clients = s.execute(query_count_clients(where)).scalar()

        total_pages = total_clients // limit + 1

        response = RPCResponse.success(
            {
                "total_clients": total_clients,
                "total_pages": total_pages,
                "page": page,
                "limit": limit,
                "clients": [
                    {
                        **{
                            k: v for k, v in r.__dict__.items() if not k.startswith("_")
                        },
                        "__created": r.created.strftime("%a %-d %b '%y @ %H:%M"),
                    }
                    for r in result
                ],
            },
            "Clients found.",
        )

        s.close()

        return response