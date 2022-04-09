import { fireEvent, waitFor, within } from '@testing-library/react-native'
import MockDate from 'mockdate'

import { parameratizableScreenSetup } from '@/testing/setup'
import { IconID, TestID } from '@/testing/testID'

import SeasonCalendarScreen, { SeasonCalendarScreenProps } from '.'

const mockLinkTo = jest.fn()

jest.mock('@react-navigation/native', () => {
    const actual = jest.requireActual('@react-navigation/native')
    return {
        ...actual,
        useLinkTo: () => mockLinkTo
    }
})

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    MockDate.reset()
})

const setup =
    parameratizableScreenSetup<SeasonCalendarScreenProps>(SeasonCalendarScreen)

it('show games for the current week on render', async () => {
    const {
        resolvers: {
            Query: { season },
            Season: { games }
        },
        render
    } = setup()

    season.mockImplementationOnce(() => ({
        id: 'season-1'
    }))
    games.mockImplementationOnce(() => [
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
    ])
    const app = render({
        seasonId: 'season-1',
        day: '01-03-2022'
    })
    await app.findByText(/jan 2022/i)
    const game1 = within(
        await app.findById(TestID.COMPONENT, 'SeasonCalendarGameItem', 'game-1')
    )
    await app.findByText(/wed/i)
    await app.findByText(/5/i)
    await game1.findByText(/game 1/i)
    await game1.findByText(/12 - 2 PM/i)
    await game1.findByText(/game location 1/i)
    const game2 = within(
        await app.findById(TestID.COMPONENT, 'SeasonCalendarGameItem', 'game-2')
    )
    await app.findByText(/thu/i)
    await app.findByText(/6/i)
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

it('shows games for next week', async () => {
    const {
        resolvers: {
            Query: { season }
        },
        render
    } = setup()

    const app = render({
        seasonId: 'season-1',
        day: '01-03-2022'
    })

    season.mockImplementationOnce(() => ({
        id: 'season-1'
    }))
    const nextWeekIcon = await app.findById(
        TestID.ICON,
        IconID.CALENDAR_NEXT_WEEK
    )
    fireEvent.press(nextWeekIcon)
    await waitFor(() => {
        expect(mockLinkTo).toHaveBeenCalledWith(
            '/season/season-1/calendar/01-10-2022'
        )
    })
})

it('jumps to games for a particiular week', async () => {
    const {
        resolvers: {
            Query: { season }
        },
        render
    } = setup()

    const app = render({
        seasonId: 'season-1',
        day: '01-03-2022'
    })

    season.mockImplementationOnce(() => ({
        id: 'season-1'
    }))
    const selectWeekButton = await app.findByText(/jan 2022/i)

    fireEvent.press(selectWeekButton)
    const selectSheet = within(
        await app.findById(TestID.COMPONENT, 'SeasonCalendarWeekSelectSheet')
    )
    const weekItem = await selectSheet.findByText(/feb 07 2022/i)

    fireEvent.press(weekItem)
    await waitFor(() => {
        expect(mockLinkTo).toHaveBeenCalledWith(
            '/season/season-1/calendar/02-07-2022'
        )
    })
})

it('navigates to a game page on click', async () => {})
