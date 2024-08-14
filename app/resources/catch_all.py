from flask import current_app as app
from flask import render_template


@app.route("/", defaults={"_": ""})
@app.route("/<path:_>")
def catch_all(_):
    print("catch_all", _)
    return render_template("catch_all.html")
