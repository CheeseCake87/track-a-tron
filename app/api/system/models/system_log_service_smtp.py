import sqlalchemy as s

from app.extensions import db


class SystemLogServiceSmtp(db.Model):
    """
    Table to store the results of the SMTP Service
    """

    __tablename__ = "system_service_smtp_log"

    # PriKey
    system_service_smtp_log_id = s.Column(s.Integer, primary_key=True)

    # Data
    to = s.Column(s.String(32), default=None, nullable=True)
    reply_to = s.Column(s.String(32), default=None, nullable=True)
    from_ = s.Column(s.String(32), name="from", default=None, nullable=True)
    subject = s.Column(s.String(128), default=None, nullable=True)
    body = s.Column(s.String, default=None, nullable=True)

    # Tracking
    created = s.Column(s.DateTime)
