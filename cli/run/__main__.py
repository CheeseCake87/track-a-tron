import click as c

from run import cmd_run


@c.group("entry")
def entry():
    """
    Run cli commands.
    """
    pass


cmd_run(entry)

if __name__ == '__main__':
    entry()
