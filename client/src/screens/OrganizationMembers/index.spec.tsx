import { OrganizationRoleType } from '@/generated'
import { _useRoute } from '@/testing/modules/reactNavigation'
import { parameratizableScreenSetup } from '@/testing/setup'

import OrganizationMembersScreen, { OrganizationMembersScreenProps } from '.'

const setup = parameratizableScreenSetup<OrganizationMembersScreenProps>(
    OrganizationMembersScreen
)

it('shows organization members', async () => {
    const utils = setup()
    const {
        resolvers: {
            Query: { organization }
        }
    } = utils

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

    const app = utils.render({
        orgId: 'organization-1'
    })

    await app.findByText(/user 1/i)
    await app.findByText(/user 2/i)
})
