import DivisionList from '@/components/DivisionList'
import MockAppProvider from '@/components/MockAppProvider'
import { createRender, waitForRender } from '@/tests/setup'

it.only('should show season divisions and positions', async () => {
    // Render division list
    const { getByText, resolvers } = createRender((client) => (
        <MockAppProvider client={client}>
            <DivisionList seasonId="1" />
        </MockAppProvider>
    ))

    resolvers.Query.season.mockReturnValue({
        id: '1',
        divisionList: [
            {
                id: '1',
                name: 'division 1',
                positionList: [
                    {
                        id: '1',
                        name: 'position 1'
                    }
                ]
            },
            {
                id: '2',
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

    getByText(/division 1/)
    getByText(/position 1/)
    getByText(/division 2/)
})

it('should delete a division', () => {})

it('should delete a position', () => {})

it('should create a position', () => {})

it('should cancel division deletion', () => {})

it('should cancel position deletion', () => {})

it('should rerender when new division added', () => {})
