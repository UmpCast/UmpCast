import { InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
    typePolicies: {
        Authorization: {
            keyFields: [],
            fields: {
                refreshToken: {},
                accessToken: {}
            }
        }
    }
})

export default cache
