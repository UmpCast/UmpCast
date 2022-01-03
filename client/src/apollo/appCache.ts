import { InMemoryCache, makeVar } from '@apollo/client'
import { AuthState } from 'generated-types'

export const AppVar = {
    selectedOrganization: makeVar<string | null>(null),
    authState: makeVar<AuthState | null>(null)
}

const AppCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                selectedOrganization: {
                    read: () => AppVar.selectedOrganization()
                },
                authState: {
                    read: () => AppVar.authState()
                }
            }
        }
    }
})

export default AppCache
