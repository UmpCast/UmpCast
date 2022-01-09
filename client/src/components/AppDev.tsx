import {
    buildOnEmailSend,
    renderOnEmailSend
} from '@/tests/SignIn/onEmailSend.setup'

export default function AppDev() {
    const { EMAIL_ERROR } = buildOnEmailSend()

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
