import { fireEvent } from '@testing-library/react-native'

import { ORG_JOIN_CODE_OFFSET } from '@/config/constants/server'
import {
    RootStackParamList,
    RootStackRoute
} from '@/navigation/navigators/Root/Stack'
import { ComponentSetup } from '@/testing/setupV2'

import OrganizationMembersScreenRightHeader from './RightHeader'

class Setup extends ComponentSetup {
    constructor() {
        super(OrganizationMembersScreenRightHeader)
    }

    render(params: RootStackParamList[RootStackRoute.OrganizationMembers]) {
        return super.render({
            route: {
                params
            }
        })
    }
}

it('displays the organization invite code', async () => {
    const setup = new Setup()
    const {
        Query: { organization }
    } = setup.resolvers

    organization.mockImplementationOnce(() => ({
        id: '0'
    }))
    const api = setup.render({
        orgId: 'organization-1'
    })
    const inviteButton = await api.findByText(/invite/i)

    fireEvent.press(inviteButton)
    await api.findByText(RegExp(String(ORG_JOIN_CODE_OFFSET), 'i'))
})
