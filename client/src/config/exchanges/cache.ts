import {
    cacheExchange as createCacheExchange,
    Cache,
    Resolver
} from '@urql/exchange-graphcache'

const getUserKey = (cache: Cache) =>
    cache.resolve({ __typename: 'Query' }, 'me')?.toString()

const transformToDate: Resolver = (parent, _args, _cache, info) =>
    new Date(parent[info.fieldName] as string)

const cacheExchange = createCacheExchange({
    keys: {
        SeasonMembershipStatus: () => null
    },
    resolvers: {
        Season: {
            startDate: transformToDate,
            endDate: transformToDate
        }
    },
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
            },
            deleteOrganization: (_result, _args, cache) => {
                const key = getUserKey(cache)
                if (!key) return
                cache.invalidate(key, 'organizationPermitList')
            },
            createSeason: (_result, args: any, cache) => {
                const key = cache.keyOfEntity({
                    __typename: 'Organization',
                    id: args.input.organizationId as string
                })
                cache.invalidate(key, 'seasonList')
            },
            removeSeasonMember: (_result, args: any, cache) => {
                const key = cache.keyOfEntity({
                    __typename: 'Season',
                    id: args.input.seasonId as string
                })
                cache.invalidate(key, 'members')
                cache.invalidate(key, 'membershipStatuses')
            },
            addSeasonMembers: (_result, args: any, cache) => {
                const key = cache.keyOfEntity({
                    __typename: 'Season',
                    id: args.input.seasonId as string
                })
                cache.invalidate(key, 'members')
                cache.invalidate(key, 'membershipStatuses')
            }
        }
    }
})

export default cacheExchange