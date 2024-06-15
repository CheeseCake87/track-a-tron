import argparse
import shlex
import subprocess
import sys
from pathlib import Path


class ArgumentParser(argparse.ArgumentParser):
    def __init__(self, *args, **kwargs):
        super(ArgumentParser, self).__init__(*args, **kwargs)

    def print_help(self, file=None):
        print(
            "\n\r"
            "Usage: python3 Dockerfiles build / rebuild"
            "\n\r"
        )


class DockerCommander:
    _base_command = "docker"

    def __init__(self):
        pass

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        return None

    def run(self, command: str):
        return subprocess.run(
            [self._base_command, *shlex.split(command)],
            cwd=Path.cwd(),
            capture_output=True,
        )


Dockerfiles = [
    ("track-a-tron-l1", "Dockerfiles/Dockerfile-l1"),
    ("track-a-tron-l2", "Dockerfiles/Dockerfile-l2"),
    ("track-a-tron-l3", "Dockerfiles/Dockerfile-l3"),
]

pars = ArgumentParser(prog="Dockerfiles", add_help=False)
subparsers = pars.add_subparsers()
build_parser = subparsers.add_parser("build")
build_parser.set_defaults(build=False)
build_parser = subparsers.add_parser("rebuild")
build_parser.set_defaults(rebuild=False)
build_parser = subparsers.add_parser("remove")
build_parser.set_defaults(remove=False)
args = pars.parse_args()

if (
        not hasattr(args, "build")
        and not hasattr(args, "rebuild")
        and not hasattr(args, "remove")
):
    arg_override = input("Enter 'build', 'rebuild' or 'remove': ")
else:
    arg_override = None

if hasattr(args, "build") or arg_override == "build":
    with DockerCommander() as dc:
        docker_images = dc.run("images").stdout.decode("utf-8")

        for df in Dockerfiles:
            if df[0] not in docker_images:
                print(f"Building {df[0]}...")
                r = dc.run(f"build -t {df[0]} -f {df[1]} .")
                print(r.stdout.decode("utf-8"))

                if "ERROR:" in r.stdout.decode("utf-8"):
                    print(r.stdout.decode("utf-8"))
                    sys.exit(1)

                if "ERROR:" in r.stderr.decode("utf-8"):
                    print(r.stderr.decode("utf-8"))
                    sys.exit(1)

            else:
                print(f"{df[0]} already exists.")

    sys.exit(0)

if hasattr(args, "rebuild") or arg_override == "rebuild":
    with DockerCommander() as dc:
        for df in Dockerfiles:
            print(f"Rebuilding {df[0]}...")
            r = dc.run(f"build -t {df[0]} -f {df[1]} .")

            if "ERROR:" in r.stdout.decode("utf-8"):
                print(r.stdout.decode("utf-8"))
                sys.exit(1)

            if "ERROR:" in r.stderr.decode("utf-8"):
                print(r.stderr.decode("utf-8"))
                sys.exit(1)

    sys.exit(0)

if hasattr(args, "remove") or arg_override == "remove":
    with DockerCommander() as dc:
        for df in Dockerfiles:
            print(f"Removing {df[0]}...")
            dc.run(f"rmi {df[0]}")

    sys.exit(0)

pars.print_help()
