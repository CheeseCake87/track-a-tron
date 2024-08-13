import sqlalchemy as s

from app.extensions import db


class WorkshopTicketDevice(db.Model):
    __tablename__ = "workshop_ticket_device"

    # PriKey
    workshop_ticket_device_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_workshop_ticket_id = s.Column(
        s.Integer,
        s.ForeignKey("workshop_ticket.workshop_ticket_id"),
    )
    fk_user_id = s.Column(
        s.Integer,
        s.ForeignKey("system_user.user_id"),
    )  # User that created the workshop_entity

    # Data
    type = s.Column(s.String, nullable=False)
    make = s.Column(s.String, nullable=True)
    model = s.Column(s.String, nullable=True)
    serial_number = s.Column(s.String, nullable=True)
    password = s.Column(s.String, nullable=True)

    power_adapter_included = s.Column(s.Boolean, nullable=False, default=False)

    additional_info = s.Column(s.String, nullable=True)

    # Tracking
    created = s.Column(s.DateTime, nullable=False)
