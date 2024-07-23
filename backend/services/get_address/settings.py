class GetAddressSettings:
    api_key: str
    administration_key: str
    disabled: bool

    def __init__(
        self,
        api_key: str,
        administration_key: str,
        disabled: bool,
    ):
        self.api_key = api_key
        self.administration_key = administration_key
        self.disabled = disabled
