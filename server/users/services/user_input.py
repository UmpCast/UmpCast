from pydantic import BaseModel, validator


class UserInput(BaseModel):
    first_name: str
    last_name: str
    street_address: str
    city: str
    state: str
    zip_code: int
    phone_number: str

    @validator("zip_code")
    def zip_code_validator(cls, zip_code: int) -> int:
        if len(str(zip_code)) != 5:
            raise ValueError("Zip code must be 5 digits")
        return zip_code

    @validator("phone_number")
    def phone_number_validator(cls, phone_number: str) -> str:
        if len(phone_number) != 10:
            raise ValueError("Phone number must be 10 digits")
        return phone_number
