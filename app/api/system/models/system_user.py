import sqlalchemy as s

from app.extensions import db


class SystemUser(db.Model):
    __tablename__ = "system_user"

    # PriKey
    user_id = s.Column(s.Integer, primary_key=True)

    # Data
    username = s.Column(s.String(256), nullable=False)
    display_name = s.Column(s.String(64), nullable=False)
    email = s.Column(s.String(256), nullable=True)
    sms = s.Column(s.String(18), nullable=True)

    # Private
    password = s.Column(s.String(512), nullable=False)
    salt = s.Column(s.String(4), nullable=False)
    private_key = s.Column(s.String(256), nullable=False)

    # Permissions
    user_type = s.Column(s.String(12), nullable=True)  # user, manager, admin
    disabled = s.Column(s.Boolean, default=False)
    deleted = s.Column(s.Boolean, default=False)

    # Tracking
    created = s.Column(s.DateTime)
