from pydantic import ValidationError
from schema.services import InputError
from typing import List


def get_input_errors(error: ValidationError) -> List[InputError]:
    return [
        InputError(
            key=e["loc"][0],
            message=e["msg"],
        )
        for e in error.errors()
    ]
