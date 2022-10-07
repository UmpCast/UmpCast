import { Resolver, UpdateResolver, cacheExchange } from '@urql/exchange-graphcache'

const transformToDate: Resolver = (parent, _args, _cache, info) =>
    new Date(parent[info.fieldName] as any)

const invalidateAll: UpdateResolver = (parent, _args, cache) => cache.invalidate('Query')

export const graphCacheExchange = cacheExchange({
    keys: {
        JoinedOrganization: () => null,
        ParticipatingSeason: () => null,
        OrganizationMember: () => null,
        OrganizationMembership: () => null,
        SeasonParticipant: () => null,
        SeasonParticipantPermit: () => null,
        PositionVisibility: () => null,
        UserOrganization: () => null,
        UserSeason: () => null
    },
    resolvers: {
        Game: {
            startTime: transformToDate,
            endTime: transformToDate
        }
    },
    updates: {
        Mutation: {
            assignGameListing: invalidateAll,
            unassignGameListing: invalidateAll
        }
    }
})
