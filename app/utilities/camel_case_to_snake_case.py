def camel_case_to_snake_case(value: str) -> str:
    """
    Switches name of the class CamelCase to snake_case
    """
    special_characters = [
        " ",
        "-",
        "(",
        ")",
        ".",
        "^",
        "&",
        "*",
        "!",
        "?",
        "<",
        ">",
        "[",
        "]",
        "{",
        "/",
        "\\",
        ":",
        ";",
        "@",
        "#",
        "$",
        "%",
        "}",
        "|",
        "`",
        "~",
        "'",
        '"',
        ",",
        ".",
        "+",
        "=",
        "£",
    ]
    value = value.strip()
    chars_as_list = list(value)
    clean_char_list = []

    for index, char in enumerate(chars_as_list):
        if char in special_characters:
            clean_char_list.append("_")

        if char.isupper():
            if index > 0:
                if chars_as_list[index + 1].islower():
                    clean_char_list.append("_")
                    clean_char_list.append(char.lower())
                else:
                    if chars_as_list[index - 1].islower():
                        clean_char_list.append("_")

                    clean_char_list.append(char.lower())
            else:
                clean_char_list.append(char.lower())
        else:
            clean_char_list.append(char)

    chars = "".join(clean_char_list)

    if chars.startswith("_"):
        chars = chars[1:]

    if chars.endswith("_"):
        chars = chars[:-1]

    return chars


if __name__ == "__main__":
    print(camel_case_to_snake_case("CamelCaseTESTClassToSnakeCase"))
