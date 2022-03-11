const serverResolvers = {
    Query: {
        viewer: () => null,
        organization: () => ({
            id: '1',
            email: null,
            websiteUrl: null,
            members: [
                {
                    user: {
                        firstName: 'Steve',
                        lastName: 'Vonderhaar',
                        profilePictureUrl: null
                    },
                    role: 'OWNER'
                },
                {
                    user: {
                        firstName: 'Coco',
                        lastName: 'Vonderhaar',
                        profilePictureUrl: null
                    },
                    role: 'MEMBER'
                },
                {
                    user: {
                        firstName: 'Jonathan',
                        lastName: 'Kao',
                        profilePictureUrl: null
                    },
                    role: 'MEMBER'
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
            organization: {
                members: [
                    {
                        user: {
                            id: 'user-1',
                            firstName: 'User',
                            lastName: '1'
                        },
                        isParticipating: true
                    },
                    {
                        user: {
                            id: 'user-2',
                            firstName: 'User',
                            lastName: '2'
                        },
                        isParticipating: true
                    }
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
        })
    }
}

export default serverResolvers
