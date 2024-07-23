import sqlalchemy as s

from app.sql import BaseModel


class Receipt(BaseModel):
    __tablename__ = "receipt"

    # PriKey
    receipt_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_user_id = s.Column(s.Integer, s.ForeignKey("system_user.user_id"), nullable=False)
    fk_client_id = s.Column(s.Integer, s.ForeignKey("client.client_id"), nullable=True)
    fk_invoice_id = s.Column(s.Integer, s.ForeignKey("invoice.invoice_id"), nullable=True)
    fk_workshop_ticket_id = s.Column(s.Integer, s.ForeignKey("workshop_ticket.workshop_ticket_id"), nullable=True)

    receipt_number = s.Column(s.Integer, nullable=False)  # Unique Random Number (epoch maybe?)
    payment_method = s.Column(s.String, nullable=False)

    gross_total = s.Column(s.Integer, nullable=False)  # In pennies
    tax_total = s.Column(s.Integer, nullable=False)  # In pennies
    net_total = s.Column(s.Integer, nullable=False)  # In pennies

    # Tacking
    created = s.Column(s.DateTime, nullable=False)
