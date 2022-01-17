import { fireEvent } from '@testing-library/react-native'

import DivisionList from '@/components/DivisionList'
import MockAppProvider from '@/components/MockAppProvider'
import { createRender, waitForRender } from '@/tests/setup'

it('should show season divisions and positions', async () => {
    // Render division list
    const { getByText, resolvers } = createRender((client) => (
        <MockAppProvider client={client}>
            <DivisionList seasonId="1" />
        </MockAppProvider>
    ))

    resolvers.Query.season.mockReturnValue({
        divisionList: [
            {
                name: 'division 1',
                positionList: [
                    {
                        name: 'position 1'
                    }
                ]
            },
            {
                name: 'division 2',
                positionList: []
            }
        ]
    })

    // Finished rendering
    await waitForRender()

    expect(resolvers.Query.season.mock.calls[0][1]).toMatchObject({
        id: '1'
    })

    getByText(/division 1/i)
    getByText(/position 1/i)
    getByText(/division 2/i)
})

it.only('should delete a division', async () => {
    // Render division list
    const { getByTestId, findByText, resolvers } = createRender((client) => (
        <MockAppProvider client={client}>
            <DivisionList seasonId="1" />
        </MockAppProvider>
    ))

    resolvers.Query.season.mockReturnValue({
        divisionList: [
            {
                id: '1',
                name: 'division 1'
            }
        ]
    })

    // Finish rendering
    await waitForRender()

    const divisionEdit = getByTestId(/division-edit-icon-1/i)

    // Press Header
    fireEvent.press(divisionEdit)

    const deleteButton = await findByText(/delete/i)

    fireEvent.press(deleteButton)
})

it('should delete a position', () => {})

it('should create a position', () => {})

it('should cancel division deletion', () => {})

it('should cancel position deletion', () => {})

it('should rerender when new division added', () => {})
