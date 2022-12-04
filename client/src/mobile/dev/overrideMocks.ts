import { Query, Mutation } from '@/mock/schema.generated'
import { DeepPartial } from 'react-hook-form'
import { genCalendarGames } from './generators'

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
                games: genCalendarGames(40)
            }
        }
    },
    Mutation(): DeepPartial<Mutation> {
        return {
            addSeasonParticipants: {
                success: true
            },
            assignGameListing: {
                success: true
            },
            createDivision: {
                success: true
            },
            createGame: {
                success: true
            },
            createOrganization: {
                success: true
            },
            createSeason: {
                success: true
            },
            deleteDivision: {
                success: true
            },
            deleteOrganization: {
                success: true
            },
            deletePosition: {
                success: true
            },
            getOrCreateUser: {
                success: true
            },
            joinOrganization: {
                success: true
            },
            leaveOrganization: {
                success: true
            },
            removeSeasonParticipant: {
                success: true
            },
            unassignGameListing: {
                success: true
            },
            updateDivision: {
                success: true
            },
            updateOrganization: {
                success: true
            },
            updateSeason: {
                success: true
            },
            updateSeasonParticipantPermit: {
                success: true
            },
            updateUser: {
                success: true
            },
            uploadOrganizationLogo: {
                success: true
            },
            uploadUserProfilePicture: {
                success: true
            }
        }
    }
}
