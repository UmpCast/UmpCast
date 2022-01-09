import {
    buildOnEmailSend,
    renderOnEmailSend
} from '@/__tests__/SignIn/onEmailSend.spec'

export default function AppDev() {
    const { VALID_EMAIL, EMAIL_ERROR } = buildOnEmailSend()

    const resolvers = {
        Mutation: {
            sendSignInLink: () => ({
                errors: EMAIL_ERROR
            })
        }
    }

    return renderOnEmailSend({
        resolvers
    })
}
