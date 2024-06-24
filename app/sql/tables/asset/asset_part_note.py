import sqlalchemy as s

from app.sql import BaseModel


class AssetPartNote(BaseModel):
    __tablename__ = "asset_part_note"

    # PriKey
    asset_part_note_id = s.Column(s.Integer, primary_key=True)

    # ForKey
    fk_asset_part_id = s.Column(s.Integer, s.ForeignKey("asset_part.asset_part_id"), nullable=False)
    fk_user_id = s.Column(s.Integer, s.ForeignKey("user.user_id"), nullable=False)

    # Data
    note = s.Column(s.String, nullable=False)

    created = s.Column(s.DateTime, nullable=False)
