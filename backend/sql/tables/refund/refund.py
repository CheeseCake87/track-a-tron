import sqlalchemy as s

from backend.sql import BaseModel


class Refund(BaseModel):
    __tablename__ = "refund"

    # PriKey
    refund_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_user_id = s.Column(s.Integer, s.ForeignKey("system_user.user_id"), nullable=False)
    fk_client_id = s.Column(s.Integer, s.ForeignKey("client.client_id"), nullable=True)
    fk_invoice_id = s.Column(s.Integer, s.ForeignKey("invoice.invoice_id"), nullable=True)
    fk_receipt_id = s.Column(s.Integer, s.ForeignKey("receipt.receipt_id"), nullable=True)

    refund_number = s.Column(s.Integer, nullable=False)  # Unique Random Number (epoch maybe?)
    refund_method = s.Column(s.String, nullable=False)

    refund_reason = s.Column(s.String, nullable=True)

    amount = s.Column(s.Integer, nullable=False)  # In pennies

    # Tacking
    created = s.Column(s.DateTime, nullable=False)
