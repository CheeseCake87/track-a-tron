class Required:
    _fv = None

    def __init__(self, *args):
        if args:
            self._fv = args[0]

    def __repr__(self):
        return None

    def __str__(self):
        return None


class Optional:
    _fv = None

    def __init__(self, *args):
        if args:
            self._fv = args[0]

    def __repr__(self):
        return self._fv

    def __str__(self):
        return self._fv
