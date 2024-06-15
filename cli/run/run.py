import subprocess as sp  # noqa
import typing as t

import click as c


def cmd_run(group: t.Union[c.Group, t.Any]):
    @group.command("development", help="Run in development mode.")
    def run_dev():
        sp.run(["quart", "--app", "app:run_dev", "run"])

    @group.command("production", help="Run in production mode.")
    def run_pro():
        sp.run(["hypercorn", "app:run_pro"])
