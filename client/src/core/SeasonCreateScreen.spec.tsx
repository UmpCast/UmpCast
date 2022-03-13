import { fireEvent, waitFor } from '@testing-library/react-native'

import { _useNavigation, _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'
import SeasonCreateScreen from './SeasonCreateScreen'

beforeEach(() => {
    jest.spyOn(global.Date, 'now').mockImplementation(() =>
        new Date('01/01/2022').valueOf()
    )
})

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

    await api.fillForm({
        name: 'season 1',
        startDate: '02/01/2022',
        endDate: '03/01/2022'
    })

    createSeason.mockImplementationOnce(() => ({
        errors: []
    }))
    fireEvent.press(createButton)
    await waitFor(() => {
        expect(_useNavigation.goBack).toHaveBeenCalled()
    })
    expect(createSeason.mock.calls[0][1]).toMatchObject({
        input: {
            organizationId: setup.org.id,
            name: 'season 1',
            startDate: new Date('02/01/2022').toISOString(),
            endDate: new Date('03/01/2022').toISOString()
        }
    })
})
