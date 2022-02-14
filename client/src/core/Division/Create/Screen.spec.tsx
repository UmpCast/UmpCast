import { act, fireEvent, waitFor } from '@testing-library/react-native'

import AppMockProvider from '@/core/App/Mock/Provider'
import { createRender } from '@/mock/render'

import DivisionCreateScreen from './Screen'

const setup = () => {
    const route: any = { params: { seasonId: 'season-1' } }
    const navigation: any = { goBack: jest.fn() }

    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <DivisionCreateScreen route={route} navigation={navigation} />
        </AppMockProvider>
    ))

    return {
        ...utils,
        navigation
    }
}

it('should create division when valid inputs provided', async () => {
    const divisionInput = {
        name: 'new division'
    }

    // Render form
    const utils = setup()

    // Submit valid form
    utils.resolvers.Mutation.createDivision.mockReturnValue({
        errors: []
    })

    await act(() => utils.fillForm(divisionInput))
    fireEvent.press(await utils.findByText(/^create$/i))

    await waitFor(() => {
        expect(
            utils.resolvers.Mutation.createDivision.mock.calls[0][1]
        ).toMatchObject({
            input: {
                ...divisionInput,
                seasonId: 'season-1'
            }
        })
    })

    expect(utils.navigation.goBack).toHaveBeenCalled()
})

it('should be empty when shown', async () => {
    // Render form
    const utils = setup()

    act(async () => {
        Object.keys(['name']).forEach((field) => {
            const input = utils.getByTestId(`${field}-input`)
            expect(input).toHaveProp('value', '')
        })
    })
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