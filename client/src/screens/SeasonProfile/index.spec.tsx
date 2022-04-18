import { fireEvent, waitFor } from '@testing-library/react-native'
import { format } from 'date-fns'

import { SEASON_DATE_FORMAT } from '@/config/constants/dfns'
import { _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import SeasonAboutEditScreen from '.'

beforeEach(() => {
    jest.spyOn(global.Date, 'now').mockImplementation(() =>
        new Date('01/01/2022').valueOf()
    )
})

class Setup extends BaseSetup {
    constructor() {
        super(<SeasonAboutEditScreen />)
        _useRoute.mockReturnValue({
            params: {
                seasonId: 'season-1'
            }
        })
    }
}

it('should edit season details', async () => {
    const setup = new Setup()
    const {
        Query: { season },
        Mutation: { updateSeason }
    } = setup.resolvers

    season.mockImplementationOnce((_, { id }) => ({
        id,
        name: 'season 1',
        endDate: new Date('03/01/2022').toISOString()
    }))
    const api = setup.render()
    const saveButton = await api.findByText(/save changes/i)

    await api.fillForm({
        name: 'season 2',
        endDate: format(new Date('04/01/2022'), SEASON_DATE_FORMAT)
    })

    updateSeason.mockImplementationOnce(() => ({
        errors: []
    }))
    fireEvent.press(saveButton)
    await waitFor(() => {
        expect(updateSeason.mock.calls[0][1]).toMatchObject({
            input: {
                seasonId: 'season-1',
                name: 'season 2',
                endDate: new Date('04/01/2022').toISOString()
            }
        })
    })
})
