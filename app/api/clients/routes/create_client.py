from app.decorators import limit_to_json
from app.utilities import APIResponse, condense_client_address
from flask_imp.security import api_login_check
from .. import rest
from ..query.client import query_create_client


@rest.post("/create")
@api_login_check("logged_in", True, {"navigate": "/login"})
@limit_to_json
def create_client(json):
    first_name = json.get("first_name", "")
    business_name = json.get("business_name", "")

    phone = json.get("phone", "")
    alt_phone = json.get("alt_phone", "")
    email_address = json.get("email_address", "")
    alt_email_address = json.get("alt_email_address", "")

    if not first_name and not business_name:
        return APIResponse.fail(
            "Please provide either a first name or business name.",
        )

    if not phone and not alt_phone and not email_address and not alt_email_address:
        return APIResponse.fail(
            "Please provide at least one contact method.",
        )

    new_client = query_create_client(json)

    print(new_client)

    if not new_client:
        return APIResponse.fail(
            "Unable to create client.",
        )

    return APIResponse.success(
        "Client created.",
        {
            "client_id": new_client.client_id,
            "fk_user_id": new_client.fk_user_id,
            "business_name": new_client.business_name,
            "first_name": new_client.first_name,
            "last_name": new_client.last_name,
            "phone": new_client.phone,
            "email_address": new_client.email_address,
            "alt_phone": new_client.alt_phone,
            "alt_email_address": new_client.alt_email_address,
            "building_name": new_client.building_name,
            "sub_building_name": new_client.sub_building_name,
            "building_number": new_client.building_number,
            "sub_building_number": new_client.sub_building_number,
            "address_line_1": new_client.address_line_1,
            "address_line_2": new_client.address_line_2,
            "address_line_3": new_client.address_line_3,
            "locality": new_client.locality,
            "town_or_city": new_client.town_or_city,
            "county": new_client.county,
            "district": new_client.district,
            "postcode": new_client.postcode,
            "country": new_client.country,
            "email_address_dnc": new_client.email_address_dnc,
            "phone_dnc": new_client.phone_dnc,
            "__added_by": new_client.rel_system_user.display_name,
            "__address": condense_client_address(new_client),
            "__created": new_client.created.strftime("%a %-d %b")
        }

    )
