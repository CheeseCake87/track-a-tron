from functools import wraps

from flask import request, abort


def limit_to_json(*args_, **kwargs_):
    def limit_to_json_wrapper(func):
        @wraps(func)
        def inner(*args, **kwargs):
            if not request.is_json:
                return {"status": "fail", "message": "Requests must be in JSON"}

            json = request.json

            if isinstance(json, dict):
                return func(json, *args, **kwargs)
            else:
                return abort(400)

        return inner

    return limit_to_json_wrapper(*args_, **kwargs_)
