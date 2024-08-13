from app.config import flask_config, imp_config
from app.extensions import imp, db, vt, folders
from flask import Flask
from flask_orjson import OrjsonProvider

__version__ = "0.1.0"


def create_app():
    app = Flask(__name__, static_url_path="/")
    app.json = OrjsonProvider(app)
    flask_config.init_app(app)

    folders.init_app(app)

    # https://github.com/CheeseCake87/flask-imp
    imp.init_app(app, imp_config)
    imp.import_app_resources()
    imp.import_blueprints("api")
    imp.import_models("models")

    # https://github.com/CheeseCake87/vite-transporter
    vt.init_app(
        app,
        cors_allowed_hosts=[
            "http://127.0.0.1:6262",
        ],
    )

    db.init_app(app)

    with app.app_context():
        db.create_all()

    return app


__all__ = ["create_app", "__version__"]
