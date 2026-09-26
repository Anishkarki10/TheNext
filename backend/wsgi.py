from app import create_app

app = create_app()

if __name__ == "__main__":
    # Debug mode enables Werkzeug's interactive debugger, which is remote code
    # execution if this ever runs reachable from the internet - only ever on
    # for local dev (APP_ENV unset/development). Production should run this
    # via a real WSGI server (gunicorn etc.), not `python wsgi.py`, anyway.
    debug = app.config["APP_ENV"] != "production"
    app.run(host="0.0.0.0", port=5000, debug=debug)
