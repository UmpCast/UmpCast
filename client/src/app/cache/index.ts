import { gql, InMemoryCache } from '@apollo/client'

import recoverAuth from 'app/auth/graphql/mutations/recoverAuth'

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

        this.initialize()
    }

    // eslint-disable-next-line class-methods-use-this
    async initialize(): Promise<void> {
        await recoverAuth()
    }
}
