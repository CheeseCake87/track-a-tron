class GetAddressSettings:
    api_key: str
    administration_key: str

    def __init__(
        self,
        api_key: str,
        administration_key: str,
    ):
        self.api_key = api_key
        self.administration_key = administration_key
