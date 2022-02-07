import AppMockProvider from '@/core/App/Mock/Provider'
import { useUserJoinedOrgScreenQuery } from '@/generated'
import { createRender } from '@/mock/render'
import UserJoinedOrgList from './List'

const MockScreen = () => {
    const [{ data }] = useUserJoinedOrgScreenQuery()
}

const setup = () => {
    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <UserJoinedOrgList />
        </AppMockProvider>
    ))

    return utils
}

it('shows user owned & member organizations', async () => {
    const utils = setup()

    utils.resolvers.Query.me.mockImplementationOnce(() => {
        return {
            organizationPermitList: [
                {
                    organization: {
                        title: 'organization 1',
                        pictureUrl: 'https://organization-1.profile.picture'
                    },
                    permissionLevel: 'MEMBER'
                },
                {
                    organization: {
                        title: 'organization 2',
                        pictureUrl: null
                    },
                    permissionLevel: 'OWNER'
                }
            ]
        }
    })

    await utils.findByText(/organization 1/i)
    await utils.findByText(/organization 2/i)
})

// it('adds user to an organization with invite code', () => {})

// it('removes a member from an organization', () => {})

// it('navigates to create a new organization', () => {})
