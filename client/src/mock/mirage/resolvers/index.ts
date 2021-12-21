import createOrganizationMutation from './createOrganizationResolver'
import inputErrorDefaultResolver from './inputErrorDefaultResolver'
import managerPermitListResolver from './managerPermitListResolver'
import sendEmailVerificationMutation from './sendEmailVerificationResolver'

export default {
    SendEmailVerificationPayload: {
        errors: inputErrorDefaultResolver
    },
    UserPermit: {
        managerPermitList: managerPermitListResolver
    },
    Mutation: {
        createOrganization: createOrganizationMutation,
        sendEmailVerification: sendEmailVerificationMutation
    }
}
