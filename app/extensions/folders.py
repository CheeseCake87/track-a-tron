import typing as t
from pathlib import Path

from flask import Flask


class Folders:
    _flask_app: Flask
    _flask_app_path: Path
    _instance_path: Path
    _uploads_path: Path

    def __init__(self, app: t.Optional[Flask] = None) -> None:
        if app:
            self.init_app(app)

    def init_app(self, app: Flask) -> None:
        self._flask_app = app
        self._flask_app_path = Path(app.root_path)
        self._instance_path = Path(app.instance_path)
        self._uploads_path = self._instance_path / "uploads"

        self._instance_path.mkdir(exist_ok=True)
        self._uploads_path.mkdir(exist_ok=True)

    @property
    def app_root_path(self) -> Path:
        return self._flask_app_path

    @property
    def instance(self) -> Path:
        return self._instance_path

    @property
    def uploads(self) -> Path:
        return self._uploads_path
