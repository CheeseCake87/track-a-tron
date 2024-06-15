from pathlib import Path


class Config:
    SECRET_KEY = "my_secret_key"


class Folders:
    _app: Path
    _instance: Path
    _uploads: Path

    def __init__(self):
        self._app = Path(__file__).parent.parent
        self._instance = self._app / "instance"
        self._uploads = self._app / self._instance / "uploads"

        if not self._app.exists():
            raise FileNotFoundError(f"Directory {self._app} does not exist.")

        if not self._app.is_dir():
            raise NotADirectoryError(f"{self._app} is not a directory.")

        self._instance.mkdir(exist_ok=True)
        self._uploads.mkdir(exist_ok=True)

    @property
    def app(self):
        return self._app

    @property
    def instance(self):
        return self._instance

    @property
    def uploads(self):
        return self._uploads
