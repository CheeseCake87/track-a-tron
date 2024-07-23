import sqlalchemy as s

from backend.sql import BaseModel


class PartialPayment(BaseModel):
    __tablename__ = "partial_payment"

    # PriKey
    partial_payment_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_user_id = s.Column(s.Integer, s.ForeignKey("system_user.user_id"), nullable=False)
    fk_client_id = s.Column(s.Integer, s.ForeignKey("client.client_id"), nullable=True)
    fk_invoice_id = s.Column(s.Integer, s.ForeignKey("invoice.invoice_id"), nullable=True)
    fk_receipt_id = s.Column(s.Integer, s.ForeignKey("receipt.receipt_id"), nullable=True)

    partial_payment_number = s.Column(s.Integer, nullable=False)  # Unique Random Number (epoch maybe?)
    payment_method = s.Column(s.String, nullable=False)

    amount = s.Column(s.Integer, nullable=False)  # In pennies

    # Tacking
    created = s.Column(s.DateTime, nullable=False)
