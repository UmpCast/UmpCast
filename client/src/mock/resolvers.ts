import { SeasonPermission } from '@/generated'

const mockResolvers = {
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
        season: () => {
            return {
                id: 'season-1',
                memberList: [
                    {
                        user: {
                            id: 'user-1',
                            firstName: 'User',
                            lastName: '1',
                            profilePictureUrl: null
                        },
                        permissionList: [
                            SeasonPermission.Manager,
                            SeasonPermission.Referee
                        ]
                    },
                    {
                        user: {
                            id: 'user-2',
                            firstName: 'User',
                            lastName: '2',
                            profilePictureUrl: null
                        },
                        permissionList: [SeasonPermission.Referee]
                    }
                ],
                organization: {
                    myPermit: {
                        permissionLevel: 'OWNER'
                    }
                }
            }
        }
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

export default mockResolvers
