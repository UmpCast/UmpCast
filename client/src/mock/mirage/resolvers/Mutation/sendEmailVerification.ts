import { AppServerResolver } from '../../createPureMirageServer'

const sendEmailVerification: AppServerResolver = () => ({
    errors: null,
    emailSent: true
})

export default sendEmailVerification
