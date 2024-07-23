import sqlalchemy as s

from backend.sql import BaseModel


class Invoice(BaseModel):
    __tablename__ = "invoice"

    # PriKey
    invoice_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_user_id = s.Column(s.Integer, s.ForeignKey("system_user.user_id"), nullable=False)
    fk_client_id = s.Column(s.Integer, s.ForeignKey("client.client_id"), nullable=True)
    fk_receipt_id = s.Column(s.Integer, s.ForeignKey("receipt.receipt_id"), nullable=True)
    fk_workshop_ticket_id = s.Column(s.Integer, s.ForeignKey("workshop_ticket.workshop_ticket_id"), nullable=True)

    # Flags
    paid = s.Column(s.Boolean, nullable=False, default=False)
    void = s.Column(s.Boolean, nullable=False, default=False)

    # Tracking
    created = s.Column(s.DateTime, nullable=False)
