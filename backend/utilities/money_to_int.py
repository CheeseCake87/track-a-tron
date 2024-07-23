def money_to_int(value):
    """
    Converts a money value, commonly in float format 100.00 to an int value 10000
    """
    if not value:
        return 0

    if isinstance(value, str):
        if not value[0].isdigit():
            value = value[1:]  # Remove potential currency symbol

        if value.isdigit():
            return int(value) * 100
        else:
            if "." in value:
                rounder = round(float(value), 2) * 100
                return int(rounder)

    if isinstance(value, int):
        return value * 100

    if isinstance(value, float):
        return int(value * 100)

    return 0


if __name__ == "__main__":
    print("1 PASS", money_to_int("100.99") == 10099)
    print("2 PASS", money_to_int("100") == 10000)
    print("3 PASS", money_to_int(100) == 10000)
    print("4 PASS", money_to_int(100.99) == 10099)
    print("5 PASS", money_to_int("$100.99") == 10099)
    print("6 PASS", money_to_int("$100") == 10000)
