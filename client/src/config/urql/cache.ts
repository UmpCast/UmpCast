import {
    cacheExchange as createCacheExchange,
    Cache,
    Resolver
} from '@urql/exchange-graphcache'

const getUserKey = (cache: Cache) =>
    cache.resolve({ __typename: 'Query' }, 'viewer')?.toString()

const cacheExchange = createCacheExchange({
    keys: {
        UserJoinedOrganizationEdge: () => null,
        UserParticipatingSeasonEdge: () => null,
        SeasonParticipantEdge: () => null,
        OrganizationMemberEdge: () => null
    },
    updates: {
        Mutation: {
            register(_result, _args, cache) {
                cache.invalidate({
                    __typename: 'Query',
                    id: 'isRegistered'
                })
            },
            deleteDivision(_result, args: any, cache) {
                cache.invalidate({
                    __typename: 'Division',
                    id: args.input.divisionId
                })
            },
            deletePosition(_result, args: any, cache) {
                cache.invalidate({
                    __typename: 'Position',
                    id: args.input.positionId
                })
            },
            joinOrganization: (_result, _args, cache) => {
                const key = getUserKey(cache)
                if (!key) return
                cache.invalidate(key)
            },
            leaveOrganization: (_result, _args, cache) => {
                const key = getUserKey(cache)
                if (!key) return
                cache.invalidate(key)
            },
            createOrganization: (_result, _args, cache) => {
                const key = getUserKey(cache)
                if (!key) return
                cache.invalidate(key)
            },
            deleteOrganization: (_result, _args, cache) => {
                const key = getUserKey(cache)
                if (!key) return
                cache.invalidate(key)
            },
            createSeason: (_result, args: any, cache) => {
                const key = cache.keyOfEntity({
                    __typename: 'Organization',
                    id: args.input.organizationId as string
                })
                cache.invalidate(key)
            },
            removeSeasonParticipant: (_result, args: any, cache) => {
                const key = cache.keyOfEntity({
                    __typename: 'Season',
                    id: args.input.seasonId as string
                })
                cache.invalidate(key)
            },
            addSeasonParticipants: (_result, args: any, cache) => {
                const key = cache.keyOfEntity({
                    __typename: 'Season',
                    id: args.input.seasonId as string
                })
                cache.invalidate(key)
            }
        }
    }
})

export default cacheExchange
