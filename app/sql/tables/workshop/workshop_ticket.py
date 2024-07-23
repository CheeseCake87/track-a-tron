import sqlalchemy as s

from app.sql import BaseModel


class WorkshopTicket(BaseModel):
    __tablename__ = "workshop_ticket"

    # PriKey
    workshop_ticket_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_user_id = s.Column(
        s.Integer,
        s.ForeignKey("system_user.user_id"),
    )  # User that created the workshop_ticket
    fk_assigned_user_id = s.Column(
        s.Integer, s.ForeignKey("system_user.user_id"), nullable=True
    )  # User that the workshop_ticket is assigned to
    fk_client_id = s.Column(
        s.Integer,
        s.ForeignKey("client.client_id"),
        nullable=True,
    )  # Client that the workshop_ticket is for

    # Data
    workshop_tag = s.Column(s.String, nullable=False)  # Unique identifier
    category_code = s.Column(s.Integer, nullable=False)
    status_code = s.Column(s.Integer, nullable=False)
    request = s.Column(s.String, nullable=False)

    # Due date
    no_due_datetime = s.Column(s.Boolean, nullable=False, default=True)
    due_datetime = s.Column(s.DateTime, nullable=True, default=None)

    # Tracking
    created = s.Column(s.DateTime, nullable=False)

    # Relationships
    rel_added_by = s.orm.relationship("SystemUser", foreign_keys=[fk_user_id])
    rel_assigned_to = s.orm.relationship("SystemUser", foreign_keys=[fk_assigned_user_id])
    rel_client = s.orm.relationship("Client")
    rel_devices = s.orm.relationship("WorkshopTicketDevice")
    rel_items = s.orm.relationship("WorkshopTicketItem")
