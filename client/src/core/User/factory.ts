import faker from 'faker'

function RegistrationInput() {
    return {
        firstName: 'John',
        lastName: 'Doe',
        state: faker.address.state(),
        city: faker.address.city(),
        streetAddress: faker.address.streetAddress(),
        zipCode: '12345',
        phoneNumber: '1234567890'
    }
}

export default {
    RegistrationInput
}
