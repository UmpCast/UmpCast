import { act, fireEvent, waitFor, within } from '@testing-library/react-native'

import { createRender } from '@/testing/render'

import PositionCreateScreen from './Screen'
import AppMockProvider from '@/testing/AppMockProvider'
import { TestID } from '@/testing/testID'

const setup = () => {
    const route: any = { params: { divisionId: 'division-1' } }
    const navigation: any = { goBack: jest.fn() }

    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <PositionCreateScreen navigation={navigation} route={route} />
        </AppMockProvider>
    ))

    return {
        ...utils,
        navigation
    }
}

it('should create position when valid inputs provided', async () => {
    const POSITION_INPUT = {
        name: 'new position'
    }

    // Render form
    const utils = setup()

    // Submit valid form
    utils.resolvers.Mutation.createPosition.mockReturnValue({
        errors: []
    })

    await act(() => utils.fillForm(POSITION_INPUT))
    fireEvent.press(await utils.findByText(/^create$/i))

    await waitFor(() => {
        expect(
            utils.resolvers.Mutation.createPosition.mock.calls[0][1]
        ).toMatchObject({
            input: {
                ...POSITION_INPUT,
                divisionId: 'division-1'
            }
        })
    })
})

it('should be empty when shown', async () => {
    // Render form
    const utils = setup()

    await within(
        await utils.findByTestId(`${TestID.FORM_CONTROL}:name`)
    ).findByDisplayValue('')
})

it('should perform validation when submitted', async () => {
    // Render form
    const utils = setup()

    // Submit empty form
    fireEvent.press(await utils.findByText(/^create$/i))

    expect((await utils.findAllByText(/is required/i)).length).toBe(1)
})

it('should show server errors when submitted', async () => {
    const POSITION_INPUT = {
        name: 'new position'
    }

    // Render form
    const utils = setup()

    // Submit valid form
    utils.resolvers.Mutation.createPosition.mockReturnValueOnce({
        errors: [
            {
                key: 'name',
                message: 'external name error'
            }
        ]
    })

    await act(() => utils.fillForm(POSITION_INPUT))
    fireEvent.press(await utils.findByText(/^create$/i))

    await utils.findByText('external name error')
})
