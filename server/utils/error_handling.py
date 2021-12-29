from typing import List

from pydantic import ValidationError

from schema.services import InputError


def get_input_errors(error: ValidationError) -> List[InputError]:
    return [
        InputError(
            key=e["loc"][0],
            message=e["msg"],
        )
        for e in error.errors()
    ]
