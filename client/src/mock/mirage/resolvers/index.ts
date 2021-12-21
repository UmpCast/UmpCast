import inputErrorDefault from './Common/inputErrorsDefault'
import sendEmailVerification from './Mutation/sendEmailVerification'

export default {
    SendEmailVerificationPayload: {
        errors: inputErrorDefault
    },
    Mutation: {
        sendEmailVerification
    }
}
