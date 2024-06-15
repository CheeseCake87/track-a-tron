import typing as t

TRULY = [1, "1", True, "True", "true"]


class ZeptoSettings:
    dev_mode: bool
    sender: str
    api_url: str
    token: str

    def __init__(
            self,
            dev_mode: t.Union[int, str, bool],
            sender: str,
            api_url: str,
            token: str,
    ):
        self.dev_mode = True if dev_mode in TRULY else False
        self.sender = sender
        self.api_url = api_url
        self.token = token
