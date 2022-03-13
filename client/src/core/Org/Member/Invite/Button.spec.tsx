import { fireEvent } from '@testing-library/react-native'

import { ORG_JOIN_CODE_OFFSET } from '@/config/constants/server'
import { _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import OrgInviteButton from './Button'

class Setup extends BaseSetup {
    org = {
        id: '1'
    }

    constructor() {
        super(<OrgInviteButton />)
    }

    withRoute() {
        _useRoute.mockReturnValue({
            params: {
                id: this.org.id
            }
        })
    }

    withOrganization() {
        const {
            Query: { organization }
        } = this.resolvers
        organization.mockImplementationOnce(() => ({
            id: this.org.id
        }))
    }
}

it('displays the organization invite code', async () => {
    const setup = new Setup()
    const joinCode = String(Number(setup.org.id) + ORG_JOIN_CODE_OFFSET)

    setup.withRoute()
    setup.withOrganization()
    const api = setup.render()
    const inviteButton = await api.findByText(/invite/i)

    fireEvent.press(inviteButton)
    await api.findByText(RegExp(`${joinCode}`, 'i'))
})
