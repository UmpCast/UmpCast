import AppMockProvider from '@/core/App/Mock/Provider'
import { createRender } from '@/mock/render'
import OrgInfoScreen from './Screen'

const setup = () => {
    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <OrgInfoScreen />
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

it('adds user to an organization with invite code', async () => {
    const utils = setup()

    utils.resolvers.Query.me.mockImplementationOnce(() => {
        return {
            organizationPermitList: []
        }
    })

    await utils.findByText(/join organization/i)
    expect(utils.queryByText(/organization 1/i)).toBeNull()

    utils.resolvers.Mutation.joinOrganization.mockImplementationOnce(() => {
        utils.resolvers.Query.me.mockImplementationOnce(() => {
            return {
                organizationPermitList: [
                    {
                        organization: {
                            title: 'organization 1'
                        }
                    }
                ]
            }
        })
    })

    await utils.findByText(/organization 1/i)
    expect(
        utils.resolvers.Mutation.joinOrganization.mock.calls[0][1]
    ).toMatchObject({
        joinCode: '123456'
    })
})

// it('removes a member from an organization', () => {})

// it('navigates to create a new organization', () => {})
