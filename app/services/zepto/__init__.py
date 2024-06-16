from .service import ZeptoService
from .settings import ZeptoSettings

SERVICE_KEYS = ["sender", "api_url", "token"]

__all__ = ["ZeptoSettings", "ZeptoService", "SERVICE_KEYS"]
