import { Query, Mutation } from '@/mock/schema.generated'
import { DeepPartial } from 'react-hook-form'

export default {
    Query(): DeepPartial<Query> {
        return {
            viewer: {
                joinedOrganizations: [
                    {
                        organization: {
                            name: 'Palo Alto Little League'
                        }
                    },
                    {
                        organization: {
                            name: 'Saratoga Little League'
                        }
                    }
                ],
                participatingSeasons: [
                    {
                        season: {
                            name: 'Fall Ball 2022'
                        }
                    },
                    {
                        season: {
                            name: 'All Stars 2022'
                        }
                    }
                ]
            },
            organization: {
                name: 'Palo Alto Little League'
            },
            season: {
                games: [{
                    name: '2'
                }, {
                    name: 's'
                },{
                    name: 'a'
                }, {
                    name: 'b'
                }]
            }
        }
    },
    Mutation(): DeepPartial<Mutation> {
        return {
            getOrCreateUser: {
                success: true
            },
            createOrganization: {
                success: true
            },
            createSeason: {
                success: true
            },
            joinOrganization: {
                success: true
            }
        }
    }
}
