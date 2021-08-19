import { gql, InMemoryCache, makeVar } from "@apollo/client";
import createAccess from "app/auth/graphql/mutations/createAccess";
import setAuth from "app/auth/graphql/mutations/setAuth";
import getRefresh from "app/auth/graphql/queries/getRefresh";
import { AuthToken } from "app/auth/models/token"

export const localSchema = gql`
    extend type Query {
        isAuthorized: Boolean!
    }
`

export const authTokenVar = makeVar<AuthToken | null>(null)

export default class ClientCache extends InMemoryCache {

    constructor(){
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

    
    async initialize(): Promise<void> {
        await ClientCache.initializeAuth()
    }

    static async initializeAuth(): Promise<boolean> {
        const refreshToken = getRefresh()
        if(!refreshToken) return false

        const accessToken = await createAccess(refreshToken)
        if(!accessToken) return false

        setAuth({
            ...refreshToken,
            accessToken
        })

        return true
    }
}