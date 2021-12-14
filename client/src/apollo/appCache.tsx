import { InMemoryCache, makeVar } from '@apollo/client'

import Authentication from 'app/auth/models/Authentication'

export const authenticationVar = makeVar<Authentication | null>(null)
export const selectedOrganizationVar = makeVar<string | null>(null)

const AppCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                authentication: {
                    read() {
                        return authenticationVar()
                    }
                },
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
