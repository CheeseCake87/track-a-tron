from app.sql.tables import Client


def condense_client_address(result: Client, return_short: bool = False) -> str:
    address_start_list = [
        result.building_name,
        result.sub_building_name,
        result.building_number,
        result.sub_building_number,
        result.address_line_1,
    ]
    address_start = " ".join([v for v in address_start_list if v])

    if return_short:
        return f"{address_start if address_start else '-'}{', ' + result.postcode if result.postcode else ''}"

    address_values = [
        address_start,
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
