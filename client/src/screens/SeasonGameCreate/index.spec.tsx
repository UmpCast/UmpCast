import { parameratizableScreenSetup } from '@/testing/setup'
import { fireEvent, waitFor } from '@testing-library/react-native'
import SeasonGameCreateScreen, { SeasonGameCreateScreenProps } from '.'

const setup = parameratizableScreenSetup<SeasonGameCreateScreenProps>(
    SeasonGameCreateScreen
)

it('creates a new game', async () => {
    const {
        resolvers: {
            Query: { season },
            Mutation: { createGame }
        },
        navigation: { goBack },
        render
    } = setup()

    season.mockImplementation(() => {
        return {
            divisions: [
                {
                    id: 'division-1',
                    name: 'division 1'
                },
                {
                    id: 'division-2',
                    name: 'division 2'
                }
            ]
        }
    })
    const app = render({
        seasonId: 'season-1'
    })
    const divisionSelect = await app.findByText(/select division/i)
    const submitButton = await app.findByText(/create/i)

    await app.fillForm({
        name: 'game 1',
        location: 'location 1'
    })

    fireEvent.press(divisionSelect)
    const selection = await app.findByText(/division 1/i)

    fireEvent.press(selection)

    fireEvent.press(submitButton)

    await waitFor(() => {
        expect(goBack).toHaveBeenCalled()
        expect(createGame.mock.calls[0][1]).toMatchObject({
            input: {
                divisionId: 'division-1',
                name: 'game 1',
                location: 'location 1'
            }
        })
    })
})
