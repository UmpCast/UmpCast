import faker from 'faker'

export function buildSignInParams() {
    return {
        apiKey: ['apiKey', faker.datatype.uuid()].join('-'),
        oobCode: ['oobCode', faker.datatype.uuid()].join('-'),
        mode: 'signIn'
    }
}
