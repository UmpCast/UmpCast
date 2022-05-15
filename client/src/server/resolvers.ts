import {
    Organization,
    OrganizationRoleType,
    Season,
    SeasonGameConnection,
    SeasonRoleType,
    User
} from '@/generated'
import { DeepPartial } from '@/utils/primitive'

export type ServerResolvers = {
    Query: {
        viewer(): DeepPartial<User>
        organization(): DeepPartial<Organization>
        season(): DeepPartial<Season>
    }
    Mutation: any
}

function range(size: number, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt)
}

function rangeGames(size: number, startAt = 0) {
    return range(size, startAt).map((n) => ({
        id: `game-${n}`,
        name: `game ${n}`
    }))
}

let count = 0

const MOCK_GAMES_CONNECTION: DeepPartial<SeasonGameConnection>[] = [
    {
        nodes: rangeGames(20, 80),
        pageInfo: {
            startCursor: 'start-1',
            hasPreviousPage: true
        }
    },
    {
        nodes: rangeGames(20, 100),
        pageInfo: {
            endCursor: 'end-1',
            hasNextPage: true
        }
    }
]

const serverResolvers: ServerResolvers = {
    // @ts-ignore
    DateTime: () => '2022-03-03T19:00:17.865Z',
    // @ts-ignore
    SeasonGameConnection: () => {
        const conn = MOCK_GAMES_CONNECTION[count]
        count += 1
        return conn
    },
    Query: {
        viewer: () => ({
            id: 'user-1',
            firstName: 'Victor',
            lastName: 'Lin',
            profilePictureUrl: 'https://tinyurl.com/2p84ra89',
            phoneNumber: null,
            season: {
                node: {
                    id: 'season-1'
                },
                permit: {
                    id: 'permit-1',
                    roles: [SeasonRoleType.Manager, SeasonRoleType.Referee],
                    membership: {
                        role: OrganizationRoleType.Owner
                    }
                }
            },
            organizations: [
                {
                    node: {
                        email: 'pall@gmail.com',
                        websiteUrl: 'https://www.pabaseball.org/',
                        description:
                            'Little league baseball for kids 5-13. More on our website!',
                        name: 'Palo Alto Little League',
                        logoUrl:
                            'https://images.activityhero.com/57552/original/ccdbf813-ba9d-4991-b2b8-283b6e9e8091.png'
                    },
                    membership: {
                        role: OrganizationRoleType.Owner
                    }
                },
                {
                    node: {
                        id: 'organization-2',
                        name: 'organization 2',
                        logoUrl: null
                    },
                    membership: {
                        role: OrganizationRoleType.Member
                    }
                }
            ]
        }),
        organization: () => ({
            id: '1',
            email: null,
            websiteUrl: null,
            members: [
                {
                    node: {
                        firstName: 'Steve',
                        lastName: 'Vonderhaar',
                        profilePictureUrl: null
                    },
                    membership: {
                        role: OrganizationRoleType.Owner
                    }
                },
                {
                    node: {
                        firstName: 'Coco',
                        lastName: 'Vonderhaar',
                        profilePictureUrl: null
                    },
                    membership: {
                        role: OrganizationRoleType.Member
                    }
                },
                {
                    node: {
                        firstName: 'Jonathan',
                        lastName: 'Kao',
                        profilePictureUrl: null
                    },
                    membership: {
                        role: OrganizationRoleType.Member
                    }
                }
            ],
            seasons: [
                {
                    name: 'Fall Ball 2022'
                },
                {
                    name: 'All Stars'
                }
            ]
        }),
        season: () => ({
            id: 'season-1',
            name: 'Fall Ball 2022',
            endDate: new Date('05/10/2022').toISOString(),
            organization: {
                members: [
                    {
                        node: {
                            id: 'user-1',
                            firstName: 'User',
                            lastName: '1',
                            profilePictureUrl: null
                        },
                        isParticipating: false
                    },
                    {
                        node: {
                            id: 'user-2',
                            firstName: 'User',
                            lastName: '2',
                            profilePictureUrl: null
                        },
                        isParticipating: true
                    }
                ]
            },
            participants: [
                {
                    node: {
                        firstName: 'Jonathan',
                        lastName: 'Kao',
                        profilePictureUrl: null
                    }
                },
                {
                    node: {
                        firstName: 'Steve',
                        lastName: 'Vonderhaar',
                        profilePictureUrl: null
                    }
                }
            ],
            divisions: [
                {
                    name: 'AAA',
                    positions: [
                        {
                            name: 'Base'
                        },
                        {
                            name: 'Plate'
                        }
                    ]
                },
                {
                    name: 'PCL',
                    positions: [
                        {
                            name: 'Base'
                        },
                        {
                            name: 'Plate'
                        }
                    ]
                },
                {
                    name: 'Majors',
                    positions: [
                        {
                            name: 'Base'
                        },
                        {
                            name: 'Plate'
                        }
                    ]
                }
            ]
            //  [
            //     {
            //         name: 'Say Hey Baseball vs Say Hey Baseball',
            //         startTime: '2022-01-05T20:00:00.000Z',
            //         endTime: '2022-01-05T22:00:00.000Z',
            //         location: 'Middlefield Ball Park',
            //         listings: [
            //             {
            //                 name: 'Plate',
            //                 assignee: {
            //                     node: {
            //                         profilePictureUrl:
            //                             'https://tinyurl.com/2p84ra89'
            //                     }
            //                 }
            //             },
            //             {
            //                 name: 'Base',
            //                 assignee: null
            //             }
            //         ]
            //     },
            //     {
            //         name: 'Team B vs Team C',
            //         startTime: '2022-01-06T20:00:00.000Z',
            //         endTime: '2022-01-06T22:00:00.000Z',
            //         location: 'Hoover Park'
            //     },
            //     {
            //         name: 'Team A vs Team C',
            //         startTime: '2022-01-06T20:00:00.000Z',
            //         endTime: '2022-01-06T22:00:00.000Z',
            //         location: 'Hoover Park'
            //     }
            // ]
        })
    },
    Mutation: {
        updateOrganization: () => ({
            organization: {
                id: '1',
                title: 'edited'
            },
            errors: []
        }),
        deleteOrganization: () => ({
            errors: []
        }),
        createOrganization: () => ({
            errors: []
        }),
        createSeason: () => ({
            errors: []
        }),
        leaveOrganization: () => ({
            organization: {
                id: 'organization-2'
            }
        })
    }
}

export default serverResolvers
