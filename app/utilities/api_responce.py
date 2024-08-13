import typing as t


class APIResponse:
    @staticmethod
    def success(
            message: str,
            data: t.Optional[t.Dict[str, t.Any] | t.List[t.Dict[str, t.Any]]] = None,
    ) -> t.Dict[str, t.Any]:
        return {"ok": True, "message": message, "data": data}

    @staticmethod
    def fail(
            message: str,
            data: t.Optional[t.Dict[str, t.Any] | t.List[t.Dict[str, t.Any]]] = None,
    ) -> t.Dict[str, t.Any]:
        return {"ok": False, "message": message, "data": data}
