import { parameratizableScreenSetup } from '@/testing/setup'
import { IconID, TestID } from '@/testing/testID'
import {
    fireEvent,
    waitForElementToBeRemoved,
    within
} from '@testing-library/react-native'
import SeasonCalendarScreen, { SeasonCalendarScreenProps } from '.'
import MockDate from 'mockdate'

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    MockDate.reset()
})

const setup =
    parameratizableScreenSetup<SeasonCalendarScreenProps>(SeasonCalendarScreen)

it('show games for the current week on render', async () => {
    MockDate.set('01/03/2022')

    const {
        resolvers: {
            Query: { season },
            Season: { games }
        },
        render
    } = setup()

    season.mockImplementationOnce(() => {
        return {
            id: 'season-1'
        }
    })
    games.mockImplementationOnce(() => {
        return [
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
    })
    const app = render({
        seasonId: 'season-1'
    })
    await app.findByText(/jan 2022/i)
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
    expect(season.mock.calls[0][1]).toMatchObject({
        id: 'season-1'
    })
    expect(games.mock.calls[0][1]).toMatchObject({
        startDate: new Date('01/03/2022').toISOString(),
        endDate: new Date('01/10/2022').toISOString()
    })
})

it.only('shows games for next week', async () => {
    MockDate.set('01/24/2022')

    const {
        resolvers: {
            Query: { season },
            Season: { games }
        },
        render
    } = setup()

    const app = render({
        seasonId: 'season-1'
    })

    season.mockImplementationOnce(() => {
        return {
            id: 'season-1'
        }
    })
    games.mockImplementationOnce(() => {
        return [
            {
                id: 'game-1',
                name: 'game 1',
                startTime: new Date('01/24/2022 12:00').toISOString(),
                endTime: new Date('01/24/2022 14:00').toISOString()
            }
        ]
    })
    const nextWeekIcon = await app.findById(
        TestID.ICON,
        IconID.CALENDAR_NEXT_WEEK
    )
    await app.findByText(/game 1/i)

    season.mockImplementationOnce(() => {
        return {
            id: 'season-1'
        }
    })
    games.mockClear()
    games.mockImplementationOnce(() => {
        return [
            {
                id: 'game-2',
                name: 'game 2',
                startTime: new Date('01/31/2022 12:00').toISOString(),
                endTime: new Date('01/31/2022 14:00').toISOString()
            }
        ]
    })
    fireEvent.press(nextWeekIcon)
    await app.findByText(/jan - feb 2022/i)
    await app.findByText(/game 2/i)
    expect(app.queryByText(/game 1/i)).toBeNull()
    expect(games.mock.calls[0][1]).toMatchObject({
        startDate: new Date('01/31/2022').toISOString(),
        endDate: new Date('02/7/2022').toISOString()
    })
})

it('jumps to games for a particiular week', async () => {})

it('navigates to a game page on click', async () => {})
