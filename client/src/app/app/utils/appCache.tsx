import { gql, InMemoryCache, makeVar } from '@apollo/client'

export const LocalSchema = gql`
    type Authentication {
        refreshToken: String!
        accessToken: String!
    }

    extend type Query {
        authentication: Authentication
    }
`

export const selectedOrganizationVar = makeVar<string | null>(null)

const AppCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                selectedOrganization: {
                    read() {
                        return selectedOrganizationVar()
                    }
                }
            }
        }
    }
})

export default AppCache
