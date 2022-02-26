const OrgJoinedScreenFixtures = [
    {
        Query: {
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
            })
        },
        Mutation: {
            joinOrganization: () => ({
                errors: []
            })
        }
    }
]

export default OrgJoinedScreenFixtures
