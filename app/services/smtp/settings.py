class SMTPSettings:
    username: str
    password: str
    server: str
    port: int
    disabled: bool

    def __init__(
        self,
        username: str,
        password: str,
        server: str,
        port: int,
        disabled: bool,
    ):
        self.username = username
        self.password = password
        self.server = server
        self.port = port
        self.disabled = disabled
