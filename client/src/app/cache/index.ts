import { gql, InMemoryCache } from '@apollo/client'
import getRefresh from 'app/auth/graphql/queries/getRefresh'

import setAuth from 'app/auth/graphql/mutations/_setAuth'
import createAccess from 'app/auth/graphql/mutations/refreshAuthAccess'

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
        await ClientCache.initializeAuth()
    }

    static async initializeAuth(): Promise<boolean> {
        const refreshToken = getRefresh()
        if (!refreshToken) return false

        const accessToken = await createAccess(refreshToken)
        if (!accessToken) return false

        setAuth({
            ...refreshToken,
            accessToken
        })

        return true
    }
}
