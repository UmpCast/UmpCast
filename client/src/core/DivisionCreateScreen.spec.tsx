import { act, fireEvent, waitFor, within } from '@testing-library/react-native'

import { createRender } from '@/testing/render'

import AppMockProvider from './AppMockProvider'
import DivisionCreateScreen from './DivisionCreateScreen'

const setup = () => {
    const route: any = { params: { seasonId: 'season-1' } }
    const navigation: any = { goBack: jest.fn() }

    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <DivisionCreateScreen navigation={navigation} route={route} />
        </AppMockProvider>
    ))

    return {
        ...utils,
        navigation
    }
}

it('should create division when valid inputs provided', async () => {
    const utils = setup()

    await act(() =>
        utils.fillForm({
            name: 'division 1'
        })
    )

    utils.resolvers.Mutation.createDivision.mockReturnValue({
        errors: []
    })
    fireEvent.press(await utils.findByText(/^create$/i))
    await waitFor(() => {
        expect(
            utils.resolvers.Mutation.createDivision.mock.calls[0][1]
        ).toMatchObject({
            input: {
                seasonId: 'season-1',
                name: 'division 1'
            }
        })
    })

    expect(utils.navigation.goBack).toHaveBeenCalled()
})

it('should be empty when shown', async () => {
    // Render form
    const utils = setup()

    await within(await utils.findByTestId('name-control')).findByDisplayValue(
        ''
    )
})

it('should perform validation when submitted', async () => {
    // Render form
    const utils = setup()

    // Submit empty form
    fireEvent.press(await utils.findByText(/^create$/i))

    expect((await utils.findAllByText(/is required/i)).length).toBe(1)
    expect(utils.navigation.goBack).not.toHaveBeenCalled()
})

it('should show server errors when submitted', async () => {
    const divisionInput = {
        name: 'new division'
    }

    // Render form
    const utils = setup()

    // Submit valid form
    utils.resolvers.Mutation.createDivision.mockReturnValueOnce({
        errors: [
            {
                key: 'name',
                message: 'external name error'
            }
        ]
    })

    await act(() => utils.fillForm(divisionInput))
    fireEvent.press(await utils.findByText(/^create$/i))

    await utils.findByText('external name error')
    expect(utils.navigation.goBack).not.toHaveBeenCalled()
})
