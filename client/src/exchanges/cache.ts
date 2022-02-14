import { cacheExchange, Cache } from '@urql/exchange-graphcache'

const getUserKey = (cache: Cache) =>
    cache.resolve({ __typename: 'Query' }, 'me')?.toString()

const appCacheExchange = cacheExchange({
    updates: {
        Mutation: {
            register(_result, _args, cache) {
                cache.invalidate({
                    __typename: 'Query',
                    id: 'isRegistered'
                })
            },
            deleteDivision(_result, args, cache) {
                cache.invalidate({
                    __typename: 'Division',
                    id: args.id as string
                })
            },
            deletePosition(_result, args, cache) {
                cache.invalidate({
                    __typename: 'Position',
                    id: args.id as string
                })
            },
            joinOrganization: (_result, _args, cache) => {
                const key = getUserKey(cache)
                if (!key) return
                cache.invalidate(key, 'organizationPermitList')
            },
            leaveOrganization: (_result, _args, cache) => {
                const key = getUserKey(cache)
                if (!key) return
                cache.invalidate(key, 'organizationPermitList')
            },
            createOrganization: (_result, _args, cache) => {
                const key = getUserKey(cache)
                if (!key) return
                cache.invalidate(key, 'organizationPermitList')
            }
        }
    }
})

export default appCacheExchange
