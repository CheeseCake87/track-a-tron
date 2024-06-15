import sys
from pathlib import Path

import click as c

app_dir = Path(__file__).parent.parent.parent

if not app_dir.exists():
    raise FileNotFoundError(f"Directory {app_dir} does not exist.")

if app_dir not in sys.path:
    sys.path.append(str(app_dir))


def loader():
    from setup import cmds

    @c.group("entry")
    def entry():
        """
        Run cli commands.
        """
        pass

    cmds(entry)
    entry()


if __name__ == '__main__':
    loader()
