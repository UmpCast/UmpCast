import { fireEvent } from '@testing-library/react-native'

import { ORG_JOIN_CODE_OFFSET } from '@/config/constants/server'
import { _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'
import OrgMemberListScreenRightHeader from './ScreenRightHeader'

class Setup extends BaseSetup {
    constructor() {
        super(<OrgMemberListScreenRightHeader />)
    }
}

it('displays the organization invite code', async () => {
    const setup = new Setup()
    const {
        Query: { organization }
    } = setup.resolvers

    _useRoute.mockReturnValue({
        params: {
            id: '0'
        }
    })
    organization.mockImplementationOnce(() => {
        return {
            id: '0'
        }
    })
    const api = setup.render()
    const inviteButton = await api.findByText(/invite/i)

    fireEvent.press(inviteButton)
    await api.findByText(RegExp(String(ORG_JOIN_CODE_OFFSET), 'i'))
})
