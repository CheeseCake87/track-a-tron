import sys
from pathlib import Path

from .run import cmd_run

app_dir = Path(__file__).parent.parent / "app"

if not app_dir.exists():
    raise FileNotFoundError(f"Directory {app_dir} does not exist.")

if app_dir not in sys.path:
    sys.path.append(str(app_dir))

__all__ = ["cmd_run"]
