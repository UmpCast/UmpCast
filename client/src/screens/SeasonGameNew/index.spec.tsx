import DateTimePicker from '@react-native-community/datetimepicker'
import { fireEvent, waitFor, within } from '@testing-library/react-native'
import { mocked } from 'jest-mock'
import MockDate from 'mockdate'
import { View } from 'native-base'

import { parameratizableScreenSetup } from '@/testing/setup'
import { TestID } from '@/testing/testID'

import SeasonGameNewScreen, { SeasonGameNewScreenProps } from '.'

const setup =
    parameratizableScreenSetup<SeasonGameNewScreenProps>(SeasonGameNewScreen)

jest.mock('@react-native-community/datetimepicker')

const _DateTimePicker = mocked(DateTimePicker)

beforeEach(() => {
    _DateTimePicker.mockImplementation((props) => <View {...props} />)
})

it('creates a new game', async () => {
    MockDate.set('01/03/2022')

    const {
        resolvers: {
            Query: { season },
            Mutation: { createGame }
        },
        navigation: { goBack },
        render
    } = setup()

    season.mockImplementation(() => ({
        id: 'season-1',
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
    }))
    const app = render({
        seasonId: 'season-1'
    })
    const divisionSelect = await app.findByPlaceholderText(/select division/i)
    const submitButton = await app.findByText(/create/i)
    const endTimeControl = within(
        await app.findById(TestID.FORM_CONTROL, 'endTime')
    )
    const endDateButton = await endTimeControl.findByText(/jan 3 2022/i)

    await app.fillForm({
        name: 'game 1',
        location: 'location 1'
    })

    fireEvent.press(divisionSelect)
    const selection = await app.findByText(/division 1/i)
    fireEvent.press(selection)

    fireEvent.press(endDateButton)
    const endDatePicker = await app.findById(
        TestID.FORM_INPUT,
        'endTime',
        'date'
    )

    fireEvent(endDatePicker, 'onChange', null, new Date('01/04/2022'))

    fireEvent.press(submitButton)

    await waitFor(() => {
        expect(goBack).toHaveBeenCalled()
        expect(createGame.mock.calls[0][1]).toMatchObject({
            input: {
                divisionId: 'division-1',
                startTime: new Date('01/03/2022').toISOString(),
                endTime: new Date('01/04/2022 1:00').toISOString(),
                name: 'game 1',
                location: 'location 1'
            }
        })
    })
})
