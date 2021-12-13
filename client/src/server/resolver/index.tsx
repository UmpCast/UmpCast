import createOrganizationMutation from './mutation/createOrganizationMutation'
import userPermitResolver from './userPermit/userPermitResolver'

export default {
    UserPermit: userPermitResolver,
    Mutation: {
        createOrganization: createOrganizationMutation
    }
}
