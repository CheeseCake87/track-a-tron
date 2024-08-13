from flask_imp import Imp
from flask_sqlalchemy import SQLAlchemy
from vite_transporter.flask import ViteTransporter

from .folders import Folders

imp = Imp()
db = SQLAlchemy()
folders = Folders()
vt = ViteTransporter()
