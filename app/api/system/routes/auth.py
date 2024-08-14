from app.api.system.query.system_user import query_read_system_user_by_username
from app.decorators import limit_to_json
from app.utilities import APIResponse
from flask import session
from flask_imp.auth import authenticate_password
from .. import rest


@rest.post("/auth/login")
@limit_to_json
def auth_login(json):
    username = json.get("username")
    password = json.get("password")

    user = query_read_system_user_by_username(username=username)
    if not user:
        return APIResponse.fail("Invalid username or password.")

    if not authenticate_password(password, user.password, user.salt):
        return APIResponse.fail("Invalid password.")

    session["logged_in"] = True
    session["user_id"] = user.user_id
    session["user_type"] = user.user_type

    return APIResponse.success(
        message="Logged in.",
        data={k: v for k, v in session.items() if not k.startswith("_")},
    )


@rest.get("/auth/logout")
def auth_logout():
    session["logged_in"] = False
    session["user_id"] = None
    session["user_type"] = None
    return APIResponse.success("logged out")


@rest.get("/auth/session")
def auth_session():
    return APIResponse.success(
        message="Current Session",
        data={k: v for k, v in session.items() if not k.startswith("_")},
    )
