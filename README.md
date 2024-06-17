# 🤖 track-a-tron

**Note: This project is still in development and is not ready for production use.**

Track-a-tron was built with the intention of providing features to
run a small computer repair shop.

Future goals will be to adapt the app to be used in other types of businesses.

## Setup

Setup the virtual environment

```
python3 -m venv .venv
source .venv/bin/activate
```

Install the Python requirements

```
pip install -r requirements/development.txt
```

Install and update the Frontend (Node) requirements

```
pyqwe vite-install && pyqwe vite-update
```

Terminal 1 : Run Quart

```
pyqwe quart-dev
```

Terminal 2 : Run Vite w/ SolidJS

```
pyqwe vite-run
```

Now visit http://localhost:7070 - this will display the installer page.

Load the database

```
pyqwe load-test-data
```