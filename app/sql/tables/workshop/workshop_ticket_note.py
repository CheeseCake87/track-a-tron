import sqlalchemy as s

from app.sql import BaseModel


class WorkshopTicketNote(BaseModel):
    __tablename__ = "workshop_ticket_note"

    # PriKey
    workshop_ticket_note_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_workshop_ticket_id = s.Column(
        s.Integer,
        s.ForeignKey("workshop_ticket.workshop_ticket_id"),
    )
    fk_user_id = s.Column(
        s.Integer,
        s.ForeignKey("system_user.user_id"),
        nullable=True,
    )

    # Data
    html_note = s.Column(s.String, nullable=True)
    text_note = s.Column(s.String, nullable=False)

    # Tracking
    created = s.Column(s.DateTime, nullable=False)

    rel_added_by = s.orm.relationship("SystemUser", foreign_keys=[fk_user_id])
