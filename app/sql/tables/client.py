import sqlalchemy as s

from .__base_model__ import BaseModel
from ...utilities import DatetimeDeltaRI


class Client(BaseModel):
    __tablename__ = "client"

    # PriKey
    client_id = s.Column(s.Integer, primary_key=True)

    # Data:business
    business_name = s.Column(s.String(128), default=None, nullable=True)

    # Data:name
    first_name = s.Column(s.String(128), default="", nullable=True)
    last_name = s.Column(s.String(128), default="", nullable=True)

    # Data:contact
    phone = s.Column(s.String(18), default="", nullable=True)
    email_address = s.Column(s.String, nullable=True)
    alt_phone = s.Column(s.String(18), default="", nullable=True)
    alt_email_address = s.Column(s.String, nullable=True)

    # Data:address
    building_name = s.Column(s.String(128), default=None, nullable=True)
    sub_building_name = s.Column(s.String(128), default=None, nullable=True)
    building_number = s.Column(s.String(128), default=None, nullable=True)
    sub_building_number = s.Column(s.String(128), default=None, nullable=True)
    address_line_1 = s.Column(s.String(128), default=None, nullable=True)
    address_line_2 = s.Column(s.String(128), default=None, nullable=True)
    address_line_3 = s.Column(s.String(128), default=None, nullable=True)
    locality = s.Column(s.String(128), default=None, nullable=True)
    town_or_city = s.Column(s.String(128), default=None, nullable=True)
    county = s.Column(s.String(128), default=None, nullable=True)
    district = s.Column(s.String(128), default=None, nullable=True)
    postcode = s.Column(s.String(32), default=None, nullable=True)
    country = s.Column(s.String(128), default=None, nullable=True)
    latitude = s.Column(s.Float, default=None, nullable=True)
    longitude = s.Column(s.Float, default=None, nullable=True)

    # Data:security
    security_question = s.Column(s.String(128), default="Select...", nullable=True)
    security_answer = s.Column(s.String(128), default="", nullable=True)
    security_code = s.Column(s.String(128), default="", nullable=True)

    # Flags
    email_address_dnc = s.Column(s.Boolean, default=False, nullable=True)
    phone_dnc = s.Column(s.Boolean, default=False, nullable=True)
    deleted = s.Column(s.Boolean, default=False)
    disabled = s.Column(s.Boolean, default=False)

    # Tracking
    created = s.Column(s.DateTime, default=DatetimeDeltaRI().datetime)
