import sqlalchemy as s

from app.sql import BaseModel


class WorkshopTicketStatusLog(BaseModel):
    __tablename__ = "workshop_ticket_status_log"

    # PriKey
    workshop_ticket_status_log_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_system_user_id = s.Column(
        s.Integer,
        s.ForeignKey("system_user.system_user_id"),
        nullable=True,
        default=0,
    )  # User that changed the status
    fk_workshop_ticket_id = s.Column(
        s.Integer,
        s.ForeignKey("workshop_ticket.workshop_ticket_id"),
        nullable=False,
    )

    # Current status
    to_workshop_status_id = s.Column(
        s.Integer,
        nullable=True,
        default=0,
    )
    # Previous status
    from_workshop_status_id = s.Column(
        s.Integer,
        nullable=True,
        default=0,
    )
    days_at_previous_workshop_status = s.Column(s.Integer, default=0, nullable=False)

    # Tracking
    created = s.Column(s.DateTime)
