from pydantic import BaseModel, validator, ValidationError
from django.test import TestCase
from utils.error_handling import get_input_errors
from schema.services import InputError


class TestPydanticModel(BaseModel):
    field_a: int
    field_b: str

    @validator("field_a")
    def field_a_validator(cls, field_a: int) -> int:
        raise ValueError("field_a is invalid")

    @validator("field_b")
    def field_b_validator(cls, field_b: str) -> str:
        raise ValueError("field_b is invalid")


class TestErrorHandling(TestCase):
    def test_get_input_errors(self) -> None:
        with self.assertRaises(ValidationError) as error_context:
            TestPydanticModel(field_a=1, field_b="a")
        input_errors = get_input_errors(error_context.exception)

        field_a_error = InputError(
            key="field_a",
            message="field_a is invalid",
        )

        field_b_error = InputError(
            key="field_b",
            message="field_b is invalid",
        )

        self.assertIn(field_a_error, input_errors)
        self.assertIn(field_b_error, input_errors)

        self.assertEqual(len(input_errors), 2)
