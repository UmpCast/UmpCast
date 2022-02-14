import AppMockProvider from '@/core/App/Mock/Provider'
import { RootStackRoutes } from '@/core/App/Root/Stack'
import { OrgCreateDocument } from '@/generated'
import { repeatedDebug } from '@/mock/debug'
import navigationNative from '@/mock/modules/navigationNative'
import { createRender, waitForRender } from '@/mock/render'
import { act, fireEvent, waitFor, within } from '@testing-library/react-native'
import OrgJoinedScreen from './Screen'

beforeEach(() => {
    jest.useFakeTimers()
})

const setup = () => {
    const navigate = jest.fn()

    navigationNative.useNavigation.mockReturnValue({ navigate })

    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <OrgJoinedScreen />
        </AppMockProvider>
    ))

    return {
        ...utils,
        navigate
    }
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

    const joinItem = await utils.findByText(/join organization/i)
    expect(utils.queryByText(/organization 1/i)).toBeNull()

    fireEvent.press(joinItem)

    const modal = within(await utils.findByTestId('org-join-modal'))
    const codeInput = await modal.findByTestId('code-input')
    const joinButton = await modal.findByText(/^join$/i)

    fireEvent.changeText(codeInput, '123456')

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

        return {
            errors: []
        }
    })

    fireEvent.press(joinButton)

    await waitFor(() =>
        expect(utils.queryByTestId('join-organization-modal')).toBeNull()
    )
    await utils.findByText(/organization 1/i)
    expect(
        utils.resolvers.Mutation.joinOrganization.mock.calls[0][1]
    ).toMatchObject({
        code: '123456'
    })
})

it('allows a member to leave an organization', async () => {
    const utils = setup()

    utils.resolvers.Query.me.mockImplementationOnce(() => {
        return {
            organizationPermitList: [
                {
                    organization: {
                        id: 'organization-1',
                        title: 'organization 1'
                    }
                }
            ]
        }
    })

    const itemButton = await utils.findByText(/organization 1/i)

    fireEvent.press(itemButton)

    const sheet = within(await utils.findByTestId('org-info-sheet'))
    const leaveButton = await sheet.findByText(/leave organization/i)

    utils.resolvers.Mutation.leaveOrganization.mockImplementationOnce(() => {
        utils.resolvers.Query.me.mockImplementationOnce(() => {
            return {
                organizationPermitList: []
            }
        })

        return {
            errors: []
        }
    })

    fireEvent.press(leaveButton)
    act(jest.runAllTimers)

    await waitFor(() =>
        expect(utils.queryByTestId('org-info-sheet')).toBeNull()
    )
    expect(utils.queryByText(/organization 1/i)).toBeNull()
    expect(
        utils.resolvers.Mutation.leaveOrganization.mock.calls[0][1]
    ).toMatchObject({
        id: 'organization-1'
    })
})

it('navigates to create a new organization', async () => {
    const utils = setup()

    utils.resolvers.Query.me.mockImplementationOnce(() => {
        return {
            organizationPermitList: []
        }
    })

    const createButton = await utils.findByText(/create organization/i)

    fireEvent.press(createButton)

    await waitFor(() =>
        expect(utils.navigate).toBeCalledWith(RootStackRoutes.OrgCreate)
    )
})

it.only('shows a new organization when created', async () => {
    const utils = setup()

    utils.resolvers.Query.me.mockImplementationOnce(() => {
        return {
            id: '1',
            organizationPermitList: []
        }
    })

    await waitForRender()

    utils.resolvers.Mutation.createOrganization.mockImplementationOnce(() => {
        utils.resolvers.Query.me.mockImplementationOnce(() => {
            return {
                id: '1',
                organizationPermitList: [
                    {
                        organization: {
                            title: 'organization 1'
                        }
                    }
                ]
            }
        })

        return {
            errors: []
        }
    })

    await act(() =>
        utils.client
            .mutation(OrgCreateDocument, {
                input: {
                    title: 'organization 1'
                }
            })
            .toPromise()
    )

    await utils.findByText(/organization 1/i)
})
