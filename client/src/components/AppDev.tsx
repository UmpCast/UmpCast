import createMockClient from '@/utils/dev/urql'

import MockAppProvider from '../test/components/MockAppProvider'
import SeasonStruct from './core/SeasonStruct'

// inspect({
//     iframe: false
// })

const client = createMockClient({
    resolvers: {
        Query: {
            season: () => {
                return {
                    id: '1'
                }
            }
        }
    }
})

export default function AppDev() {
    return (
        <MockAppProvider client={client}>
            <SeasonStruct seasonId="1" />
        </MockAppProvider>
    )
}
