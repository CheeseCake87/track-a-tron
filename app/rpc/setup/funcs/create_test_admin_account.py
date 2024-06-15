from flask_imp.auth import generate_salt, encrypt_password, generate_private_key
from quart_rpc.version_1_0 import RPCResponse

from app.sql import DBSession
from app.sql.queries.user import query_create_user, query_get_all_users


def create_test_admin_account(_):
    salt = generate_salt()
    password_hash = encrypt_password("!password123", salt)
    private_key = generate_private_key(salt + "admin")

    with DBSession as s:
        if_user_exists = s.execute(query_get_all_users()).scalars().all()
        if if_user_exists:
            return RPCResponse.fail("User already exists")

        # Create admin user
        new_user_id = s.execute(
            query_create_user(
                "Test Admin",
                "admin",
                password_hash,
                salt,
                private_key,
                "admin",
            )
        ).scalar_one()

        s.commit()

        response = RPCResponse.success(
            {
                "user_id": new_user_id,
                "display_name": "Test Admin",
                "username": "admin",
                "password": "!password123",
                "user_type": "admin",
                "private_key": private_key,
            },
            "Test admin created.",
        )

        s.commit()

        return response
