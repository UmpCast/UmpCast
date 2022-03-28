import { OrganizationRoleType } from '@/generated'
import {
    RootStackParamList,
    RootStackRoute
} from '@/navigation/navigators/Root/Stack'
import { _useRoute } from '@/testing/modules/reactNavigation'
import { ScreenSetup } from '@/testing/setup/screen'

import OrganizationMembersScreen from '.'

class Setup extends ScreenSetup<
    RootStackParamList,
    RootStackRoute.OrganizationMembers
> {
    constructor() {
        super(OrganizationMembersScreen)
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
                node: {
                    firstName: 'User',
                    lastName: '1'
                },
                role: OrganizationRoleType.Owner
            },
            {
                node: {
                    firstName: 'User',
                    lastName: '2'
                },
                role: OrganizationRoleType.Member
            }
        ]
    }))

    const api = setup.render({
        orgId: 'organization-1'
    })
    await api.findByText(/user 1/i)
    await api.findByText(/user 2/i)
})
