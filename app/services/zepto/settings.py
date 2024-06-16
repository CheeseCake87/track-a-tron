import typing as t


class ZeptoSettings:
    sender: str
    api_url: str
    token: str
    disabled: bool

    def __init__(
        self,
        sender: str,
        api_url: str,
        token: str,
        disabled: t.Optional[bool] = False,
    ):
        self.sender = sender
        self.api_url = api_url
        self.token = token
        self.disabled = disabled
