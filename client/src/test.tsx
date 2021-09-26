import AppCache from 'apollo/appCache'
import clearAuthentication from 'app/auth/graphql/mutations/clearAuthentication'
import setAuthenticationTokens from 'app/auth/graphql/mutations/setAuthenticationTokens'

setAuthenticationTokens('refresh', 'access')

// @ts-ignore
console.log(AppCache.data.data)

clearAuthentication()

// @ts-ignore
console.log(AppCache.data.data)
