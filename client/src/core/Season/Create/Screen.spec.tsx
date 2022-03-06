import { fireEvent, waitFor } from '@testing-library/react-native'

import { _useNavigation, _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import SeasonCreateScreen from './Screen'

class Setup extends BaseSetup {
    org = {
        id: 'organization-1'
    }

    constructor() {
        super(<SeasonCreateScreen />)

        _useRoute.mockReturnValue({
            params: {
                orgId: this.org.id
            }
        })
    }
}

it('creates a new season', async () => {
    const setup = new Setup()
    const {
        Mutation: { createSeason }
    } = setup.resolvers

    const api = setup.render()
    const createButton = await api.findByText(/^create$/i)

    createSeason.mockImplementationOnce(() => ({
        errors: []
    }))
    await api.fillForm({
        name: 'season 1',
        startDate: '01/01/2022',
        endDate: '02/01/2022'
    })
    fireEvent.press(createButton)
    await waitFor(() => {
        expect(createSeason.mock.calls[0][1]).toMatchObject({
            input: {
                organizationId: setup.org.id,
                name: 'season 1',
                startDate: new Date('01/01/2022').toISOString(),
                endDate: new Date('02/01/2022').toISOString()
            }
        })
        expect(_useNavigation.goBack).toHaveBeenCalled()
    })
})
