import { OrganizationRoleType } from '@/generated'
import { _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import OrgMemberScreen from './Screen'

class Setup extends BaseSetup {
    org = {
        id: 'organization-1'
    }

    constructor() {
        super(<OrgMemberScreen />)
        _useRoute.mockReturnValue({
            params: {
                id: this.org.id
            }
        })
    }
}

it('shows organization members', async () => {
    const setup = new Setup()
    const {
        Query: { organization }
    } = setup.resolvers

    organization.mockImplementationOnce((_, { id }) => ({
        id,
        members: [
            {
                user: {
                    firstName: 'User',
                    lastName: '1'
                },
                role: OrganizationRoleType.Owner
            },
            {
                user: {
                    firstName: 'User',
                    lastName: '2'
                },
                role: OrganizationRoleType.Member
            }
        ]
    }))
    const api = setup.render()
    await api.findByText(/user 1/i)
    await api.findByText(/user 2/i)
})
