import click as c


def cmd_users(group):
    @group.command("create-admin", help="Setup admin user.")
    def setup_admin():
        from app.sql.sessions import DBSession
        from app.sql.queries.user import query_create_user
        from flask_imp.auth import generate_salt, encrypt_password, generate_private_key

        username = c.prompt("username", type=str)
        password = c.prompt("password", type=str)

        salt = generate_salt()
        password_ = encrypt_password(password, salt)

        with DBSession as s:
            q = query_create_user(
                display_name="Admin",
                username=username,
                password=password_,
                salt=salt,
                private_key=generate_private_key(username),
                user_type="admin"
            )
            s.execute(q).scalars().all()
            s.commit()

        print("Done")

    @group.command("check-user", help="Check if a user exists.")
    def check_user():
        from app.sql.sessions import DBSession
        from app.sql.queries.user import query_get_user_by_user_id

        user_id = c.prompt("User ID", type=int)

        with DBSession as s:
            result = s.execute(
                query_get_user_by_user_id(user_id)
            )

            for row in result.scalars().all():
                print(row.user_id, row.username)
