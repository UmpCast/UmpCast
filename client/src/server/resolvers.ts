import { SeasonRole } from '@/generated'

const serverResolvers = {
    Query: {
        isRegistered: () => true,
        me: () => ({
            id: '1',
            organizationPermitList: [
                {
                    organization: {
                        email: 'pall@gmail.com',
                        websiteUrl: 'https://www.pabaseball.org/',
                        description:
                            'Little league baseball for kids 5-13. More on our website!',
                        title: 'Palo Alto Little League',
                        logoUrl:
                            'https://images.activityhero.com/57552/original/ccdbf813-ba9d-4991-b2b8-283b6e9e8091.png'
                    },
                    permissionLevel: 'OWNER'
                },
                {
                    organization: {
                        title: 'organization 2',
                        logoUrl: null
                    },
                    permissionLevel: 'MEMBER'
                }
            ]
        }),
        organization: () => ({
            id: '1',
            email: null,
            websiteUrl: null,
            memberList: [
                {
                    user: {
                        firstName: 'Steve',
                        lastName: 'Vonderhaar',
                        profilePictureUrl: null
                    },
                    permissionLevel: 'OWNER'
                },
                {
                    user: {
                        firstName: 'Coco',
                        lastName: 'Vonderhaar',
                        profilePictureUrl: null
                    },
                    permissionLevel: 'MEMBER'
                },
                {
                    user: {
                        firstName: 'Jonathan',
                        lastName: 'Kao',
                        profilePictureUrl: null
                    },
                    permissionLevel: 'MEMBER'
                }
            ],
            seasonList: [
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
            members: [
                {
                    user: {
                        id: 'user-1',
                        firstName: 'User',
                        lastName: '1',
                        profilePictureUrl: null
                    },
                    permissions: [SeasonRole.Manager, SeasonRole.Referee]
                },
                {
                    user: {
                        id: 'user-2',
                        firstName: 'User',
                        lastName: '2',
                        profilePictureUrl: null
                    },
                    permissions: [SeasonRole.Referee]
                }
            ],
            membershipStatuses: [
                {
                    permit: {
                        user: {
                            id: 'user-1',
                            firstName: 'User',
                            lastName: '1',
                            profilePictureUrl: null
                        }
                    },
                    added: false
                },
                {
                    permit: {
                        user: {
                            id: 'user-2',
                            firstName: 'User',
                            lastName: '2',
                            profilePictureUrl: null
                        }
                    },
                    added: false
                },
                {
                    permit: {
                        user: {
                            id: 'user-3',
                            firstName: 'User',
                            lastName: '3',
                            profilePictureUrl: null
                        }
                    },
                    added: false
                },
                {
                    permit: {
                        user: {
                            id: 'user-4',
                            firstName: 'User',
                            lastName: '4',
                            profilePictureUrl: null
                        }
                    },
                    added: true
                }
            ],
            viewerCanRemoveMember: true
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
