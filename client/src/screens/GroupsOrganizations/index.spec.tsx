import { fireEvent, within } from '@testing-library/react-native'

import { ORG_JOIN_CODE_OFFSET } from '@/config/constants/server'
import { OrganizationRoleType } from '@/generated'
import { _useNavigation } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'
import { TestID } from '@/testing/testID'
import GroupsOrganizationsScreen from '.'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'

beforeEach(() => {
    jest.useFakeTimers()
})

class Setup extends BaseSetup {
    constructor() {
        super(<GroupsOrganizationsScreen />)
    }
}

it('shows user owned & member organizations', async () => {
    const setup = new Setup()
    const { resolvers } = setup

    resolvers.Query.viewer.mockImplementationOnce(() => ({
        organizations: [
            {
                node: {
                    name: 'organization 1',
                    pictureUrl: 'https://organization-1.profile.picture'
                },
                membership: {
                    role: OrganizationRoleType.Member
                }
            },
            {
                node: {
                    name: 'organization 2',
                    pictureUrl: null
                },
                membership: {
                    role: OrganizationRoleType.Owner
                }
            }
        ]
    }))
    const api = setup.render()

    await api.findByText(/organization 1/i)
    await api.findByText(/organization 2/i)
})

it('adds user to an organization with invite code', async () => {
    const setup = new Setup()
    const {
        Query: { viewer },
        Mutation: { joinOrganization }
    } = setup.resolvers

    viewer.mockImplementationOnce(() => ({
        organizations: []
    }))
    const api = setup.render()
    const joinItem = await api.findByText(/join organization/i)
    expect(api.queryByText(/organization 1/i)).toBeNull()

    fireEvent.press(joinItem)
    const modal = within(await api.findByTestId('UserJoinedOrgJoinModal'))
    const codeInput = await modal.findByTestId(`${TestID.FORM_INPUT}:code`)
    const joinButton = await modal.findByText(/^join$/i)

    fireEvent.changeText(codeInput, ORG_JOIN_CODE_OFFSET.toString())
    joinOrganization.mockImplementationOnce(() => {
        viewer.mockImplementationOnce(() => ({
            organizations: [
                {
                    node: {
                        name: 'organization 1'
                    }
                }
            ]
        }))

        return {
            success: true
        }
    })

    fireEvent.press(joinButton)

    await api.findByText(/organization 1/i)
    expect(joinOrganization.mock.calls[0][1]).toMatchObject({
        input: {
            organizationId: '0'
        }
    })
    expect(api.queryByTestId('UserJoinedOrgJoinModal')).toBeNull()
})

it('shows more organization details when clicked', async () => {
    const setup = new Setup()
    const {
        Query: { viewer }
    } = setup.resolvers

    viewer.mockImplementationOnce(() => {
        return {
            organizations: [
                {
                    node: {
                        id: 'organization-1',
                        name: 'organization 1',
                        description: 'organization 1 description'
                    },
                    membership: {
                        role: OrganizationRoleType.Owner
                    }
                }
            ]
        }
    })
    const api = setup.render()
    const orgItem = await api.findByText(/organization 1/i)

    fireEvent.press(orgItem)
    const selectedSheet = within(
        await api.findById(TestID.COMPONENT, 'UserJoinedOrgListSelectedSheet')
    )

    await selectedSheet.findByText(/^organization 1$/i)
    await selectedSheet.findByText(/organization 1 description/i)
    const settingsButton = await selectedSheet.findByText(/settings/i)
    const membersButton = await selectedSheet.findByText(/members/i)

    fireEvent.press(settingsButton)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        RootStackRoute.OrganizationSettings,
        {
            orgId: 'organization-1'
        }
    )

    fireEvent.press(membersButton)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        RootStackRoute.OrganizationMembers,
        {
            orgId: 'organization-1'
        }
    )
})
