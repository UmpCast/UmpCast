import { gql, InMemoryCache } from '@apollo/client'

import { authTokenVar } from './reactiveVars'

export const localSchema = gql`
    extend type Query {
        isAuthorized: Boolean!
    }
`

export default class ClientCache extends InMemoryCache {
    constructor() {
        super({
            typePolicies: {
                Query: {
                    fields: {
                        isAuthorized: {
                            read() {
                                return authTokenVar() !== null
                            }
                        }
                    }
                }
            }
        })
    }
}
