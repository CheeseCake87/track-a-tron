import click
from flask import current_app as app


@app.cli.command("create-test-admin")
def add_test_admin():
    from app.api.system.query.system_user import query_create_system_user
    from app.api.system.query.system_user import query_read_system_user_by_username

    result = query_read_system_user_by_username("admin")

    if result:
        print("Admin user already exists.")
        return

    query_create_system_user(
        display_name="Admin",
        username="admin",
        password="admin",
        salt="salt",
        private_key="private_key",
        user_type="admin",
    )

    print("Admin user added.")


@app.cli.command("check-user")
@click.argument("username", type=str)
def check_user(username):
    from app.api.system.query.system_user import query_read_system_user_by_username

    result = query_read_system_user_by_username(username)

    if result:
        app.logger.info(f"{result.user_id} {result.username}")
