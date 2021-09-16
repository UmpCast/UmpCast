import cache from 'apollo/cache'
import setAuthorizationTokens from 'app/auth/graphql/mutations/setAuthorizationTokens'

setAuthorizationTokens('refresh', 'access')

// @ts-ignore
console.log(cache.data.data)
