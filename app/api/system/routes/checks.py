from flask import session

from app import __version__
from app.utilities import APIResponse
from .. import rest
from ..query.system import query_read_system
from ..query.system_service import query_read_all_services


@rest.get("/checks")
def checks():
    system = query_read_system()
    services = query_read_all_services()

    return APIResponse.success(
        message="Checks",
        data={
            "system_version": __version__,
            "system_setup": True if system else False,
            "enabled_services": [s.name for s in services if s.enabled],
            "session": {k: v for k, v in session.items() if not k.startswith("_")},
        },
    )
