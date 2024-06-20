from flask_imp.auth import generate_salt, encrypt_password, generate_private_key
from quart_rpc.exceptions import DataException
from quart_rpc.validation import DataDict
from quart_rpc.version_1_1 import RPCResponse

from app.services import AVAILABLE_SERVICES
from app.sql import DBSession
from app.sql.queries.system_service import query_create_service
from app.sql.queries.system import (
    query_read_system,
    query_create_system,
    query_update_system_installation_complete,
)
from app.sql.queries.system_user import query_create_system_user


def install(data):
    d = DataDict(data)
    try:
        admin_username = d.get_ensure_key("admin_username")
        admin_password = d.get_ensure_key("admin_password")
        services = d.get_ensure_key("services")
    except DataException:
        return RPCResponse.fail(
            "Missing required data.",
            {
                "admin_username": "string",
                "admin_password": "string",
                "services": "dict",
            },
        )

    valid_services = []

    for service, requirements in AVAILABLE_SERVICES.items():
        if service in services:
            this_service = services[service]

            enabled = this_service.get("enabled", None)
            category = this_service.get("category", None)
            name = this_service.get("name", None)
            data = this_service.get("data", None)

            if not data:
                return RPCResponse.fail(f"Missing data for service {service}.")

            for key, key_needs in requirements.items():
                if key_needs.get("required", False):
                    if key not in data:
                        return RPCResponse.fail(
                            f"Missing required key for service {service}: {key}"
                        )

                if key in data:
                    if not isinstance(data[key], key_needs.get("type")):
                        if key_needs.get("type") == str:
                            if data[key] == "":
                                return RPCResponse.fail(
                                    f"Key {key} for service {service} cannot be empty"
                                )

                        return RPCResponse.fail(
                            f"Invalid type for key {key} for service {service}. Expected {key_needs.get('type')}"
                        )

            valid_services.append(
                {"category": category, "name": name, "data": data, "enabled": enabled}
            )

    with DBSession as s:
        system = s.execute(query_read_system()).scalar_one_or_none()
        if system:
            if system.installed:
                return RPCResponse.fail("System already installed")
        else:
            s.execute(query_create_system())

        salt = generate_salt()
        password_hash = encrypt_password(admin_password, salt)
        private_key = generate_private_key(salt + admin_username)

        # Create admin user
        s.execute(
            query_create_system_user(
                "System",
                admin_username,
                password_hash,
                salt,
                private_key,
                "admin",
            )
        ).scalar_one()

        for valid_service in valid_services:
            s.execute(query_create_service(**valid_service))

        s.execute(query_update_system_installation_complete())

        response = RPCResponse.success(
            {
                "username": "admin",
                "services_installed": [service for service in services],
            },
            "System installed.",
        )

        s.commit()

        return response
