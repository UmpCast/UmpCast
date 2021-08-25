import { gql, InMemoryCache } from '@apollo/client'

import recoverAuth from 'app/auth/graphql/mutations/recoverAuth'

import { authTokenVar, networkErrorVar } from './reactiveVars'

export const localSchema = gql`
    type NetworkError {
        name: String!
        message: String!
    }

    extend type Query {
        isAuthorized: Boolean!
        networkError: NetworkError
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
                        },
                        networkError: {
                            read() {
                                return networkErrorVar()
                            }
                        }
                    }
                }
            }
        })
    }

    static async initialize(): Promise<void> {
        await recoverAuth()
    }
}
