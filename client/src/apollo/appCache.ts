import { InMemoryCache, makeVar } from '@apollo/client'

import { AuthState } from './generated'

export const appVar = {
    selectedOrganization: makeVar<string | null>(null),
    authState: makeVar<AuthState | null>(null)
}

const appCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                selectedOrganization: {
                    read: () => appVar.selectedOrganization()
                },
                authState: {
                    read: () => appVar.authState(),
                    merge: (_, incoming) => appVar.authState(incoming)
                }
            }
        }
    }
})

export default appCache
