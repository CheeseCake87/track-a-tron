from dotenv import load_dotenv
from flask_orjson import OrjsonProvider
from quart import Quart, session, render_template

from app.config import Config, Folders
from app.extensions import vite_transporter
from app.rpc import rpc
from app.sql import ENGINE
from app.sql import BaseModel

load_dotenv()

__version__ = "1000"


def create_app():
    folders = Folders()

    app = Quart(
        __name__,
        template_folder="resources/templates",
        static_folder="resources/static",
    )
    app.json = OrjsonProvider(app)

    app.config.from_object(Config)
    app.config["UPLOAD_FOLDER"] = folders.uploads

    BaseModel.metadata.create_all(ENGINE)

    vite_transporter.init_app(
        app,
        cors_allowed_hosts=[
            "http://127.0.0.1:6262",
        ],
    )

    app.register_blueprint(rpc)

    @app.before_request
    def before_request():
        if not session.permanent:
            session.permanent = True
        if "logged_in" not in session:
            session["logged_in"] = False
        if "user_id" not in session:
            session["user_id"] = None
        if "user_type" not in session:
            session["user_type"] = None

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    async def catch_all(path):
        _ = path
        return await render_template("index.html")

    return app


def dev():
    app = create_app()
    app.run(host="127.0.0.1", port=7070, debug=True)
