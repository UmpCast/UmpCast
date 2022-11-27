import { authExchange as createAuthExchange } from '@urql/exchange-auth'
import { getAuth } from 'firebase/auth'
import { makeOperation } from 'urql'

const authExchange = createAuthExchange({
    addAuthToOperation: ({ authState: idToken, operation }) => {
        if (!idToken) return operation

        const fetchOptions =
            typeof operation.context.fetchOptions === 'function'
                ? operation.context.fetchOptions()
                : operation.context.fetchOptions || {}

        return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
                ...fetchOptions,
                headers: {
                    ...fetchOptions.headers,
                    Authorization: idToken
                }
            }
        })
    },
    getAuth: async () => {
        const auth = getAuth()

        if (!auth.currentUser) {
            return null
        }

        return auth.currentUser.getIdToken()
    }
})

export default authExchange
