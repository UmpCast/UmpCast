from dataclasses import dataclass


@dataclass(frozen=True)
class InputError:
    key: str
    message: str
