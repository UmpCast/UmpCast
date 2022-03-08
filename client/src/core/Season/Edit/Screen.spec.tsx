import { _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'
import { fireEvent, waitFor } from '@testing-library/react-native'
import { addMonths } from 'date-fns'
import SeasonEditScreen from './Screen'

class Setup extends BaseSetup {
    constructor() {
        super(<SeasonEditScreen />)
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

    const startDate = addMonths(Date.now(), 1)
    const endDate = addMonths(Date.now(), 2)
    season.mockImplementationOnce((_, { id }) => {
        return {
            id,
            name: 'season 1',
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        }
    })
    const api = setup.render()
    const saveButton = await api.findByText(/save changes/i)

    const newEndDate = addMonths(Date.now(), 3)
    await api.fillForm({
        name: 'season 2',
        endDate: newEndDate.toISOString()
    })

    updateSeason.mockImplementationOnce(() => {
        return {
            errors: []
        }
    })
    fireEvent.press(saveButton)
    await waitFor(() => {
        expect(updateSeason.mock.calls[0][1]).toMatchObject({
            input: {
                seasonId: 'season-1',
                name: 'season 2',
                startDate: startDate.toISOString(),
                endDate: newEndDate.toISOString()
            }
        })
    })
})
