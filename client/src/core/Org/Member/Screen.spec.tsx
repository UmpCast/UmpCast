import { BaseSetup } from '@/mock/render'
import OrgMemberScreen from './Screen'

class Setup extends BaseSetup {
    constructor() {
        super(<OrgMemberScreen />)
    }

    withMembers() {
        const {
            Query: { organization }
        } = this.resolvers

        organization.mockImplementationOnce(() => {
            return {
                id: 'organization-1',
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
            }
        })
    }
}

it('shows organization members', async () => {
    const setup = new Setup()

    setup.withMembers()
    const api = setup.render()
    await api.findByText(/user 1/i)
    await api.findByText(/user 2/i)
})
