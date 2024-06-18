# 🤖 track-a-tron

**Note: This project is still in development and is not ready for production use.**

Track-a-tron was built with the intention of providing features to
run a small computer repair shop.

Future goals will be to adapt the app to be used in other types of businesses.

## Setup

Setup the virtual environment

```bash
python3 -m venv .venv
```
```bash
source .venv/bin/activate
```

Install the Python requirements

```bash
pip install -r requirements/development.txt
```

Install and update the Frontend (Node) requirements

```bash
pyqwe vite-install && pyqwe vite-update
```

Terminal 1 : Run Quart

```bash
pyqwe quart-dev
```

Terminal 2 : Run Vite w/ SolidJS

```bash
pyqwe vite-run
```

Now visit http://localhost:6262 - this will display the installer page.

Load the database

```bash
pyqwe load-test-data
```