import sqlalchemy as s

from app.sql import BaseModel


class WorkshopTicket(BaseModel):
    __tablename__ = "workshop_ticket"

    # PriKey
    workshop_ticket_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_workshop_status_id = s.Column(
        s.Integer,
        s.ForeignKey("workshop_status.workshop_status_id"),
    )  # Status of the workshop
    fk_workshop_category_id = s.Column(
        s.Integer,
        s.ForeignKey("workshop_category.workshop_category_id"),
    )  # Category of the workshop_ticket
    fk_system_user_id = s.Column(
        s.Integer,
        s.ForeignKey("system_user.system_user_id"),
    )  # User that created the workshop_ticket
    fk_assigned_user_id = s.Column(
        s.Integer, s.ForeignKey("system_user.system_user_id"), nullable=True
    )  # User that the workshop_ticket is assigned to

    # Due date
    no_due_datetime = s.Column(s.Boolean, nullable=False, default=True)
    due_datetime = s.Column(s.DateTime, nullable=True, default=None)

    # Tracking
    created = s.Column(s.DateTime, nullable=False)
