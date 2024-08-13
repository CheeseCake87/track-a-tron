from app.decorators import limit_to_json
from app.utilities import APIResponse
from flask_imp.auth import encrypt_password, generate_salt, generate_private_key
from .. import rest
from ..query.system import query_read_system, query_create_system
from ..query.system_service import query_create_service
from ..query.system_user import query_create_system_user


@rest.post("/install")
@limit_to_json
def install(json):
    data = json.data

    admin_username = data.get("admin_username")
    admin_password = data.get("admin_password")
    services = data.get("services", {})

    current_system = query_read_system()

    if current_system:
        return APIResponse.fail(
            "System already installed.",
        )

    query_create_system()

    for k, v in services.items():
        query_create_service(
            enabled=v.get("enabled"),
            name=v.get("name"),
            category=v.get("category"),
            data=v.get("data"),
        )

    salt = generate_salt()
    password = encrypt_password(admin_password, salt)
    private_key = generate_private_key(salt)

    query_create_system_user(
        display_name="System",
        username=admin_username,
        password=password,
        salt=salt,
        private_key=private_key,
        user_type="admin",
    )
