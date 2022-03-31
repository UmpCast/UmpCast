import { parameratizableScreenSetup } from '@/testing/setup'
import { TestID } from '@/testing/testID'
import { act, within } from '@testing-library/react-native'
import SeasonCalendarScreen, { SeasonCalendarScreenProps } from '.'
import MockDate from 'mockdate'

beforeEach(() => {
    jest.useFakeTimers()
    MockDate.set('01/03/2002')
})

afterEach(() => {
    MockDate.reset()
})

const setup =
    parameratizableScreenSetup<SeasonCalendarScreenProps>(SeasonCalendarScreen)

it.only('show games for the current week on render', async () => {
    const {
        resolvers: {
            Query: { season }
        },
        render
    } = setup()

    season.mockImplementationOnce(() => {
        return {
            id: 'season-1',
            games: [
                {
                    id: 'game-1',
                    name: 'game 1',
                    startTime: new Date('01/05/2022 12:00').toISOString(),
                    endTime: new Date('01/05/2022 14:00').toISOString(),
                    location: 'game location 1'
                },
                {
                    id: 'game-2',
                    name: 'game 2',
                    startTime: new Date('01/06/2022 12:00').toISOString(),
                    endTime: null
                }
            ]
        }
    })
    const app = render({
        seasonId: 'season-1'
    })
    act(jest.runAllTimers)
    const game1 = within(
        await app.findById(TestID.COMPONENT, 'SeasonCalendarGameItem', 'game-1')
    )
    await game1.findByText(/game 1/i)
    await game1.findByText(/12 - 2 PM/i)
    await game1.findByText(/game location 1/i)
    const game2 = within(
        await app.findById(TestID.COMPONENT, 'SeasonCalendarGameItem', 'game-2')
    )
    await app.findByText(/game 2/i)
    await game2.findByText(/12 PM/i)
})

it('jumps to games for another week', async () => {})

it('moves to games for the past or next week', async () => {})

it('navigates to a game page on click', async () => {})
