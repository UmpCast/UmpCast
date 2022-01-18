import MockAppProvider from '@/components/MockAppProvider'
import DivisionList from '@/components/organisms/DivisionList'
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
                name: 'test division 1',
                positionList: [
                    {
                        name: 'test position 1'
                    }
                ]
            },
            {
                name: 'test division 2',
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
