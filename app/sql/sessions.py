from sqlalchemy.orm import Session

from .engines import ENGINE


class _GDBSession:
    """
    Global Session
    """

    def __init__(self):
        pass

    def __enter__(self):
        with Session(ENGINE) as session:
            return session

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass


GDBSession = _GDBSession()
