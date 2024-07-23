import sqlalchemy as s

from backend.sql import BaseModel


class PurchaseOrder(BaseModel):
    __tablename__ = "purchase_order"

    # PriKey
    purchase_order_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_user_id = s.Column(s.Integer, s.ForeignKey("system_user.user_id"), nullable=False)

    # Tracking
    created = s.Column(s.DateTime, nullable=False)
