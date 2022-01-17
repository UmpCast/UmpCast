import renderDivisionList from '@/tests/renders/divisionList'

it('should show season divisions and positions', async () => {
    const { findByText, resolvers } = renderDivisionList()

    resolvers.Query.season.mockReturnValue({
        divisionList: [
            {
                id: 1,
                name: 'division 1',
                positionList: [
                    {
                        id: 1,
                        name: 'position 1'
                    }
                ]
            }
        ]
    })
})

it('should delete a division', () => {})

it('should delete a position', () => {})

it('should create a position')

it('should cancel division deletion')

it('should cancel position deletion')

it('should rerender when new division added', () => {})
