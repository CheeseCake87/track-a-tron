import re
from typing import Literal, Optional, List


def clean_string(
    string: str,
    remove_these: Optional[List[Literal["new_line", "tab", "dead_space"]]] = None,
) -> str:
    """
    Used to remove escapes like \n and \t in a string value.
    Takes in a list of predefined removables, can remove options if needed.
    """
    string = string.strip()
    if remove_these is None:
        remove_these = ["new_line", "tab", "dead_space"]
    if "tab" in remove_these:
        string = re.sub(r"^[ \t]+|[ \t]", " ", string)
    if "new_line" in remove_these:
        string = re.sub(r"^[ \n]+|[ \n]", " ", string)
    if "dead_space" in remove_these:
        string = re.sub(r" +", " ", string)
    return string


if __name__ == "__main__":
    test_1 = clean_string("hello   \t   \n  world")
    test_2 = clean_string("       hello     world      ", ["dead_space"])
    test_3 = clean_string("\n\n\n\n\nhello\nworld\n\n\n\n", ["new_line"])
    test_4 = clean_string("\t\t\t\thello\tworld\t\t\t\t", ["tab"])

    print("1 TEST", "FAIL:: " + test_1 if not test_1 == "hello world" else "PASS")
    print("2 TEST", "FAIL:: " + test_2 if not test_2 == "hello world" else "PASS")
    print("3 TEST", "FAIL:: " + test_3 if not test_3 == "hello world" else "PASS")
    print("4 TEST", "FAIL:: " + test_4 if not test_4 == "hello world" else "PASS")
