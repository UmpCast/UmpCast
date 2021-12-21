import { AppServerResolver } from '../createPureMirageServer'

const sendEmailVerificationResolver: AppServerResolver = () => ({
    errors: null,
    emailSent: true
})

export default sendEmailVerificationResolver
