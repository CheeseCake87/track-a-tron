from .blueprint import services_rpc

AVAILABLE = ["imap", "smtp", "zepto", "get_address"]
__all__ = ["AVAILABLE", "services_rpc"]
