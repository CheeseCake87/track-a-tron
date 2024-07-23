import sqlalchemy as s

from backend.sql import BaseModel


class StockItem(BaseModel):
    """
    Quantity is tracked by the number of line items that reference this stock item.
    """
    __tablename__ = "stock_item"

    # PriKey
    stock_item_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_user_id = s.Column(s.Integer, s.ForeignKey("system_user.user_id"), nullable=False)
    fk_stock_category_id = s.Column(s.Integer, s.ForeignKey("stock_category.stock_category_id"), nullable=True)
    fk_purchase_order_id = s.Column(s.Integer, s.ForeignKey("purchase_order.purchase_order_id"), nullable=True)
    fk_receipt_id = s.Column(s.Integer, s.ForeignKey("receipt.receipt_id"), nullable=True)

    # Data
    description = s.Column(s.String, nullable=False)
    barcode = s.Column(s.String, nullable=True)
    cost_price = s.Column(s.Integer, nullable=True)  # In pennies
    display_price = s.Column(s.Integer, nullable=True)  # In pennies
    bought_price = s.Column(s.Integer, nullable=True)  # In pennies

    location = s.Column(s.String, nullable=True)

    serial_number = s.Column(s.String, nullable=True)
    supplier = s.Column(s.String, nullable=True)
    supplier_order_number = s.Column(s.String, nullable=True)
    supplier_item_link = s.Column(s.String, nullable=True)

    # Flags
    prices_are_ex_vat = s.Column(s.Boolean, nullable=False, default=False)
    qualifies_for_vat_margin_scheme = s.Column(s.Boolean, nullable=False, default=False)
    ordered = s.Column(s.Boolean, nullable=False, default=False)
    received = s.Column(s.Boolean, nullable=False, default=False)
    sold = s.Column(s.Boolean, nullable=False, default=False)
    returned = s.Column(s.Boolean, nullable=False, default=False)
    faulty = s.Column(s.Boolean, nullable=False, default=False)

    # Tacking
    returned_date = s.Column(s.DateTime, nullable=True)
    updated = s.Column(s.DateTime, nullable=False)
    created = s.Column(s.DateTime, nullable=False)
