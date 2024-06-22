from typing import Union

from app.sql.tables import Client


def condense_client_address(result: Client) -> Union[list, str]:
    address_values = [
        result.building_name,
        result.sub_building_name,
        result.building_number,
        result.sub_building_number,
        result.address_line_1,
        result.address_line_2,
        result.address_line_3,
        result.locality,
        result.town_or_city,
        result.county,
        result.district,
        result.postcode,
        result.country,
    ]
    address = ", ".join([v for v in address_values if v])
    if not address:
        return "-"
    return address
