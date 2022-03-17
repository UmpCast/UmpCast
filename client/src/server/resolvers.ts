import { Organization, OrganizationRoleType, Season, User } from '@/generated'
import { DeepPartial } from '@/utils/object'

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
            id: '1',
            season: {
                permit: {
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
