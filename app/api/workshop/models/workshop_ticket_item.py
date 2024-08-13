import sqlalchemy as s

from app.extensions import db


class WorkshopTicketItem(db.Model):
    __tablename__ = "workshop_ticket_item"

    # PriKey
    workshop_ticket_item_id = s.Column(s.Integer, primary_key=True)

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
    description = s.Column(s.String, nullable=False)

    # Tracking
    created = s.Column(s.DateTime, nullable=False)
