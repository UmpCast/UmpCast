import { DeleteDivisionDocument, GetSeasonStructureDocument } from './generated'
import urqlMockingClient from './utils/dev/urql'

const client = urqlMockingClient({
    resolvers: {
        Query: {
            season: () => {
                return {
                    id: '1',
                    divisionList: [
                        {
                            id: '1',
                            name: 'division 1',
                            positionList: []
                        }
                    ]
                }
            }
        }
    }
})

const test = async () => {
    const res = await client
        .query(GetSeasonStructureDocument, {
            id: '1'
        })
        .toPromise()
    console.log(res)

    const res1 = await client
        .mutation(DeleteDivisionDocument, {
            id: '1'
        })
        .toPromise()
    console.log(res1)
}

test()
