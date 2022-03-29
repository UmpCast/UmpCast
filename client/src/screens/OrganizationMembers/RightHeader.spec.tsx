import { fireEvent } from '@testing-library/react-native'

import { ORG_JOIN_CODE_OFFSET } from '@/config/constants/server'
import {
    RootStackParamList,
    RootStackRoute
} from '@/navigation/navigators/Root/Stack'
import { ScreenSetup } from '@/testing/setup/screen'

import OrganizationMembersScreenRightHeader from './RightHeader'
import { parameratizableScreenSetup } from '@/testing/setup'
import { OrganizationMembersScreenProps } from '.'

const setup = parameratizableScreenSetup<OrganizationMembersScreenProps>(
    OrganizationMembersScreenRightHeader
)

it('displays the organization invite code', async () => {
    const utils = setup()
    const {
        render,
        resolvers: {
            Query: { organization }
        }
    } = utils

    organization.mockImplementationOnce(() => ({
        id: '0'
    }))
    const api = render({
        orgId: 'organization-1'
    })
    const inviteButton = await api.findByText(/invite/i)

    fireEvent.press(inviteButton)
    await api.findByText(RegExp(String(ORG_JOIN_CODE_OFFSET), 'i'))
})
