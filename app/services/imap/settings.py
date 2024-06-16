import typing as t

TRULY = [1, "1", True, "True", "true"]


class IMAPSettings:
    dev_mode: bool
    username: str
    password: str
    server: str
    port: int

    def __init__(
        self,
        dev_mode: t.Union[int, str, bool],
        username: str,
        password: str,
        server: str,
        port: t.Union[int, str],
    ):
        """
        Dev_mode will prevent the email from being sent. It will print the email instead.

        Dev_mode: 1, "1", True, "True", "true" will set dev_mode to True, else False

        :param dev_mode:
        :param username:
        :param password:
        :param server:
        :param port:
        """
        self.dev_mode = True if dev_mode in TRULY else False
        self.username = username
        self.password = password
        self.server = server

        if isinstance(port, int):
            self.port = port
        else:
            try:
                self.port = int(port)
            except ValueError:
                raise ValueError("Port must be an integer or string-int.")
