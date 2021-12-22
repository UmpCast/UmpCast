import { AppServerResolver } from '../../createPureMirageServer'

const createOrganizationResolver: AppServerResolver = (_, args, context) => {
    const { mirageServer: server } = context
    const {
        input: { name, owner: ownerId }
    } = args

    const owner = server.schema.find('userType', ownerId)
    const newOrg = server.create('organizationType', {
        name
    })

    owner?.ownedOrganizationList.add(newOrg)
    owner?.save()

    return {
        id: newOrg.id,
        name: newOrg.name
    }
}

export default createOrganizationResolver
