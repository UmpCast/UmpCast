import createOrganizationMutation from './createOrganization'
import { managerPermitListResolver } from './managerPermitList'

export default {
    UserPermit: {
        managerPermitList: managerPermitListResolver
    },
    Mutation: {
        createOrganization: createOrganizationMutation
    }
}
