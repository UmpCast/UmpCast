import { _useRoute } from '@/mock/modules/reactNavigation'
import { BaseSetup } from '@/mock/render'

import OrgMemberScreen from './Screen'

class Setup extends BaseSetup {
    org = {
        id: 'organization-1'
    }

    constructor() {
        super(<OrgMemberScreen />)
    }

    withRoute() {
        _useRoute.mockReturnValue({
            params: {
                id: this.org.id
            }
        })
    }

    withMembers() {
        const {
            Query: { organization }
        } = this.resolvers

        organization.mockImplementationOnce(() => ({
            id: this.org.id,
            memberList: [
                {
                    user: {
                        firstName: 'User',
                        lastName: '1'
                    },
                    permissionLevel: 'OWNER'
                },
                {
                    user: {
                        firstName: 'User',
                        lastName: '2'
                    },
                    permissionLevel: 'MEMBER'
                }
            ]
        }))
    }
}

it('shows organization members', async () => {
    const setup = new Setup()

    setup.withRoute()
    setup.withMembers()
    const api = setup.render()
    await api.findByText(/user 1/i)
    await api.findByText(/user 2/i)
})
