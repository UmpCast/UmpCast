import inputErrorsDefault from './Common/inputErrorsDefault'
import sendEmailVerification from './Mutation/sendEmailVerification'

export default {
    SendEmailVerificationPayload: {
        errors: inputErrorsDefault
    },
    Mutation: {
        sendEmailVerification
    }
}
