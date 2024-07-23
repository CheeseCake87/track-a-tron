import sqlalchemy as s

from app.sql import BaseModel


class LineItem(BaseModel):
    __tablename__ = "line_item"

    # PriKey
    line_item_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_receipt_id = s.Column(
        s.Integer, s.ForeignKey("receipt.receipt_id"), nullable=True
    )
    fk_invoice_id = s.Column(
        s.Integer, s.ForeignKey("invoice.invoice_id"), nullable=True
    )
    fk_workshop_ticket_id = s.Column(
        s.Integer, s.ForeignKey("workshop_ticket.workshop_ticket_id"), nullable=True
    )

    # Data
    description = s.Column(s.String, nullable=False)
    quantity = s.Column(s.Integer, nullable=False, default=1)
    barcode = s.Column(s.String, nullable=True)
    asset_tag = s.Column(s.String, nullable=True)
    unit_price = s.Column(s.Integer, nullable=False, default=0)  # In pennies

    # Flags
    prices_are_ex_vat = s.Column(s.Boolean, nullable=False, default=False)
    is_service = s.Column(s.Boolean, nullable=False, default=False)
    from_stock = s.Column(s.Boolean, nullable=False, default=False)
    from_asset = s.Column(s.Boolean, nullable=False, default=False)

    # Tracking
    updated = s.Column(s.DateTime, nullable=False)
    created = s.Column(s.DateTime, nullable=False)
