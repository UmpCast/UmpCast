import {
    Game,
    Organization,
    OrganizationRoleType,
    Season,
    SeasonRoleType,
    User
} from '@/generated'
import { DeepPartial, range } from '@/utils/primitive'
import { addDays, addHours } from 'date-fns'
import { faker } from '@faker-js/faker'

export type ServerResolvers = {
    User: any
    Query: {
        viewer(): DeepPartial<User>
        organization(): DeepPartial<Organization>
        game(): DeepPartial<Game>
        season(): DeepPartial<Season>
    }
    Mutation: any
}

const serverResolvers: ServerResolvers = {
    User: {
        profilePictureUrl: () => faker.internet.avatar()
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
        game: () => ({
            id: '1',
            name: 'Say Hey Baseball vs. Stanford Cardinals',
            location: 'Mitchell field ball park',
            startTime: new Date().toISOString(),
            division: {
                id: '1',
                name: 'AAA',
                season: {
                    id: '1',
                    name: 'Spring 2022',
                    organization: {
                        id: '1',
                        logoUrl:
                            'https://images.activityhero.com/57552/original/ccdbf813-ba9d-4991-b2b8-283b6e9e8091.png'
                    }
                }
            },
            listings: [
                {
                    id: '1',
                    name: 'Base',
                    assignee: null
                },
                {
                    id: '2',
                    name: 'Plate',
                    assignee: {
                        node: {
                            id: '1',
                            firstName: 'Jonathan',
                            lastName: 'Kao'
                        }
                    }
                }
            ]
        }),
        organization: () => ({
            id: '1',
            email: null,
            websiteUrl: null,
            logoUrl:
                'https://images.activityhero.com/57552/original/ccdbf813-ba9d-4991-b2b8-283b6e9e8091.png',
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
            startDate: new Date('03/10/2022').toISOString(),
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
            ],
            games: {
                nodes: [
                    ...range(5).map((index) => {
                        const d = addDays(new Date(), -1)
                        return {
                            name: `${faker.company.companyName()} vs ${faker.company.companyName()}`,
                            startTime: d.toISOString(),
                            endTime: addHours(d, 2).toISOString(),
                            location: 'Middlefield Ball Park',
                            listings: [
                                {
                                    name: 'Plate',
                                    assignee: null
                                },
                                {
                                    name: 'Base',
                                    assignee: null
                                }
                            ]
                        }
                    }),
                    ...range(5).map((index) => {
                        const d = addDays(new Date(), 0)
                        return {
                            name: `${faker.company.companyName()} vs ${faker.company.companyName()}`,
                            startTime: d.toISOString(),
                            endTime: addHours(d, 2).toISOString(),
                            location: 'Middlefield Ball Park',
                            listings: [
                                {
                                    name: 'Plate',
                                    assignee: null
                                },
                                {
                                    name: 'Base',
                                    assignee: null
                                }
                            ]
                        }
                    }),
                    ...range(20).map((index) => {
                        const d = addDays(new Date(), 1)
                        return {
                            name: `${faker.company.companyName()} vs ${faker.company.companyName()}`,
                            startTime: d.toISOString(),
                            endTime: addHours(d, 2).toISOString(),
                            location: 'Middlefield Ball Park',
                            listings: [
                                {
                                    name: 'Plate',
                                    assignee: null
                                },
                                {
                                    name: 'Base',
                                    assignee: null
                                }
                            ]
                        }
                    })
                ]
            }
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
        }),
        createGame: () => ({
            game: {
                id: 'awef'
            },
            errors: []
        })
    }
}

export default serverResolvers
