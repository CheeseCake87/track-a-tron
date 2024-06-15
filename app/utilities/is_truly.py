import typing as t


def is_truly(value: t.Optional[t.Union[str, bool, int]]) -> bool:
    if isinstance(value, int):
        return True if value > 0 else False

    if isinstance(value, bool):
        return value

    if isinstance(value, str):
        if value.lower() in ("true", "yes", "y", "1"):
            return True

    return False
