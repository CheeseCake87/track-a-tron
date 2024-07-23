import sqlalchemy as s

from backend.sql import BaseModel


class AssetNote(BaseModel):
    __tablename__ = "asset_note"

    # PriKey
    asset_note_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_asset_id = s.Column(s.Integer, s.ForeignKey("asset.asset_id"), nullable=False)
    fk_user_id = s.Column(s.Integer, s.ForeignKey("system_user.user_id"), nullable=False)

    # Data
    note = s.Column(s.String, nullable=False)

    created = s.Column(s.DateTime, nullable=False)
