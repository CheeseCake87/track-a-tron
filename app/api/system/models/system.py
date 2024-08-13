import sqlalchemy as s

from app.extensions import db


class System(db.Model):
    __tablename__ = "system"

    # PriKey
    system_id = s.Column(s.Integer, primary_key=True)

    # Data
    version = s.Column(s.String, nullable=False)
    installation_complete = s.Column(s.Boolean, nullable=False, default=False)
    registering_vat = s.Column(s.Boolean, nullable=False, default=False)
    vat_rate = s.Column(s.Integer, nullable=True)

    # Tracking
    created = s.Column(s.DateTime)
