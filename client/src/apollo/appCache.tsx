import { InMemoryCache } from '@apollo/client'

const AppCache = new InMemoryCache({
    typePolicies: {
        Authentication: {
            keyFields: [],
            fields: {
                refreshToken: {},
                accessToken: {}
            }
        }
    }
})

export default AppCache
