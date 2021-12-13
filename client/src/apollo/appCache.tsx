import { InMemoryCache, makeVar } from '@apollo/client'

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
