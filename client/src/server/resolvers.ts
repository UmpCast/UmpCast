import faker from 'faker'

import {
    Organization,
    OrganizationRoleType,
    Season,
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

const serverResolvers: ServerResolvers = {
    Query: {
        viewer: () => ({
            id: 'user-1',
            firstName: 'Victor',
            lastName: 'Lin',
            profilePictureUrl: 'https://tinyurl.com/2p84ra89',
            phoneNumber: null,
            state: faker.address.state(),
            city: faker.address.city(),
            streetAddress: faker.address.streetAddress(),
            zipCode: faker.address.zipCode(),
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
            games: [
                {
                    name: 'Say Hey Baseball vs Say Hey Baseball',
                    startTime: '2022-01-05T20:00:00.000Z',
                    endTime: '2022-01-05T22:00:00.000Z',
                    location: 'Middlefield Ball Park',
                    listings: [
                        {
                            name: 'Plate',
                            assignee: {
                                node: {
                                    profilePictureUrl:
                                        'https://tinyurl.com/2p84ra89'
                                }
                            }
                        },
                        {
                            name: 'Base',
                            assignee: null
                        }
                    ]
                },
                {
                    name: 'Team B vs Team C',
                    startTime: '2022-01-06T20:00:00.000Z',
                    endTime: '2022-01-06T22:00:00.000Z',
                    location: 'Hoover Park'
                },
                {
                    name: 'Team A vs Team C',
                    startTime: '2022-01-06T20:00:00.000Z',
                    endTime: '2022-01-06T22:00:00.000Z',
                    location: 'Hoover Park'
                }
            ]
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
        })
    }
}

export default serverResolvers
