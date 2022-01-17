from pydantic import ValidationError


def get_input_errors(error: ValidationError) -> list[dict[str, str]]:
    return [
        {
            "key": e["loc"][0],
            "message": e["msg"],
        }
        for e in error.errors()
    ]
