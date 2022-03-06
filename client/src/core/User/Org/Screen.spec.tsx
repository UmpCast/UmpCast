import { act, fireEvent, waitFor, within } from '@testing-library/react-native'

import { ORG_JOIN_CODE_OFFSET } from '@/constants/server'
import { RootStackRoutes } from '@/core/App/Root/Stack'
import { OrgCreateDocument } from '@/generated'
import { _useNavigation } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import UserOrgScreen from './Screen'

beforeEach(() => {
    jest.useFakeTimers()
})

class Setup extends BaseSetup {
    constructor() {
        super(<UserOrgScreen />)
    }
}

it('shows user owned & member organizations', async () => {
    const setup = new Setup()
    const { resolvers } = setup

    resolvers.Query.me.mockImplementationOnce(() => ({
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
    }))
    const api = setup.render()

    await api.findByText(/organization 1/i)
    await api.findByText(/organization 2/i)
})

it('adds user to an organization with invite code', async () => {
    const setup = new Setup()
    const { resolvers } = setup

    resolvers.Query.me.mockImplementationOnce(() => ({
        organizationPermitList: []
    }))
    const api = setup.render()
    const joinItem = await api.findByText(/join organization/i)
    expect(api.queryByText(/organization 1/i)).toBeNull()

    fireEvent.press(joinItem)
    const modal = within(await api.findByTestId('org-join-modal'))
    const codeInput = await modal.findByTestId('code-input')
    const joinButton = await modal.findByText(/^join$/i)

    fireEvent.changeText(codeInput, ORG_JOIN_CODE_OFFSET.toString())
    resolvers.Mutation.joinOrganization.mockImplementationOnce(() => {
        resolvers.Query.me.mockImplementationOnce(() => ({
            organizationPermitList: [
                {
                    organization: {
                        title: 'organization 1'
                    }
                }
            ]
        }))

        return {
            errors: []
        }
    })

    fireEvent.press(joinButton)

    await waitFor(() =>
        expect(api.queryByTestId('join-organization-modal')).toBeNull()
    )
    await api.findByText(/organization 1/i)
    expect(resolvers.Mutation.joinOrganization.mock.calls[0][1]).toMatchObject({
        id: '0'
    })
})

it('navigates to create a new organization', async () => {
    const setup = new Setup()
    const { resolvers } = setup

    resolvers.Query.me.mockImplementationOnce(() => ({
        organizationPermitList: []
    }))
    const api = setup.render()
    const createButton = await api.findByText(/create organization/i)

    fireEvent.press(createButton)
    expect(_useNavigation.navigate).toBeCalledWith(RootStackRoutes.OrgCreate)
})

it('shows a new organization when created', async () => {
    const setup = new Setup()
    const {
        resolvers: {
            Query: { me },
            Mutation: { createOrganization }
        },
        client
    } = setup

    me.mockImplementationOnce(() => ({
        id: '1',
        organizationPermitList: []
    }))
    const api = setup.render()
    await api.findByText(/member/i)

    createOrganization.mockImplementationOnce(() => {
        me.mockImplementationOnce(() => ({
            id: '1',
            organizationPermitList: [
                {
                    organization: {
                        title: 'organization 1'
                    }
                }
            ]
        }))

        return {
            errors: []
        }
    })
    await act(() =>
        client
            .mutation(OrgCreateDocument, {
                input: {
                    title: 'organization 1'
                }
            })
            .toPromise()
    )
    await api.findByText(/organization 1/i)
})
