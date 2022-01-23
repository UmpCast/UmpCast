import { act, fireEvent, waitFor } from '@testing-library/react-native'

import MockAppProvider from '@/test/components/MockAppProvider'
import { createRender } from '@/test/setup'

import CreatePositionForm from '.'

const setup = () =>
    createRender((client) => (
        <MockAppProvider client={client}>
            <CreatePositionForm divisionId="division-1" onCreate={jest.fn()} />
        </MockAppProvider>
    ))

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
