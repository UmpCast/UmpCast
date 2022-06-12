import { PrismaClient, Prisma, UserOrganizationRole, UserSeasonRole } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        id: "vz7rxTiYxCUDVuaAa8kU",
        email: "george_washington@upenn.edu",
        firstName: "George",
        lastName: "Washington",
        streetAddress: "1600 Pennsylvania Ave",
        city: "Westmoreland County",
        state: "Virginia",
        zipCode: "20103",
        phoneNumber: "650-123-4567",
    },
    {
        id: "Z0KZeBa3jenaNq3XYP7p",
        email: "john_adams@upenn.edu",
        firstName: "John",
        lastName: "Adams",
        streetAddress: "1601 Pennsylvania Ave",
        city: "Braintree",
        state: "Massachusetts",
        zipCode: "02139",
        phoneNumber: "650-234-5678",
    },
    {
        id: "TEVKdICYTbPOWUHV9boD",
        email: "thomas_jefferson@upenn.edu",
        firstName: "Thomas",
        lastName: "Jefferson",
        streetAddress: "1602 Pennsylvania Ave",
        city: "Shadwell",
        state: "Virginia",
        zipCode: "20103",
        phoneNumber: "650-345-6789",
    },
    {
        id: "k0dL2RqCF94QJaISwofY",
        email: "james_madison@upenn.edu",
        firstName: "James",
        lastName: "Madison",
        streetAddress: "1603 Pennsylvania Ave",
        city: "Port Conway",
        state: "Virginia",
        zipCode: "20103",
        phoneNumber: "650-456-7890",
    },
    {
        id: "6oMcTBRpyVnoxpdCXEZr",
        email: "james_monroe@upenn.edu",
        firstName: "James",
        lastName: "Monroe",
        streetAddress: "1604 Pennsylvania Ave",
        city: "Monroe Hall",
        state: "Virginia",
        zipCode: "20103",
        phoneNumber: "650-567-8901",
    },
];

const organizationData: Prisma.OrganizationCreateInput[] = [
    {
        name: "The Federalist Party Little League",
        email: "federalists@upenn.edu",
        websiteUrl: "www.federalists.gov",
        description: "Unify today and be free of debt tomorrow",
    },
    {
        name: "The Democratic-Republican Party Little League",
        email: "democratic-republicans@upenn.edu",
        websiteUrl: "www.democratic-republicans.gov",
        description:
            "I don't believe in the Republican party of the Democratic party, I just believe in parties",
    },
];

async function main() {
    console.log("Starting seeding...");
    await prisma.user.createMany({ data: userData })
    const users = await prisma.user.findMany();

    //Nested write that creates organization and descendent seasons, divisions, positions and games
    await prisma.organization.create({
        data: {
            name: "The Federalist Party Little League",
            email: "federalists@upenn.edu",
            websiteUrl: "www.federalists.gov",
            description: "Unify today and be free of debt tomorrow",
            userOrganizations: {
                create: [
                    {
                        userId: users[0].id,
                        role: UserOrganizationRole.MEMBER
                    },
                    {
                        userId: users[1].id,
                        role: UserOrganizationRole.MEMBER
                    },
                    {
                        userId: users[2].id,
                        role: UserOrganizationRole.MEMBER
                    },
                    {
                        userId: users[3].id,
                        role: UserOrganizationRole.OWNER
                    }
                ]
            },
            seasons: {
                create: [
                    {
                        name: "Season 1",
                        endDate: new Date("2022-08-30"),
                        userSeasons: {
                            create: [
                                {
                                    userId: users[0].id,
                                    role: UserSeasonRole.REFEREE,
                                    maxCasts: 10
                                },
                                {
                                    userId: users[1].id,
                                    role: UserSeasonRole.MANAGER,
                                    maxCasts: 10
                                }
                            ]
                        },
                        divisions: {
                            create: [
                                {
                                    name: "Division 1",
                                    games: {
                                        create: [
                                            {
                                                name: "Game 1",
                                                startTime: new Date(),
                                            },
                                            {
                                                name: "Game 2",
                                                startTime: new Date(Date.now() + 100000),
                                            },
                                            {
                                                name: "Game 3",
                                                startTime: new Date(Date.now() + 200000),
                                            }
                                        ]
                                    },
                                    positions: {
                                        create: [
                                            {
                                                name: "Home Plate Ump",
                                                userPositions: {
                                                    create: [
                                                        {
                                                            userId: users[0].id,
                                                        },
                                                        {
                                                            userId: users[1].id,
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                name: "Base Ump",
                                                userPositions: {
                                                    create: [
                                                        {
                                                            userId: users[1].id,
                                                        },
                                                        {
                                                            userId: users[2].id,
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    })

    //Create listings
    const games = await prisma.game.findMany();
    const positions = await prisma.position.findMany();
    await prisma.listing.createMany({
        data: [
            {
                name: "Game 1 Position 1",
                gameId: games[0].id,
                positionId: positions[0].id,
                userId: users[0].id
            },
            {
                name: "Game 1 Position 2",
                gameId: games[0].id,
                positionId: positions[1].id
            },
            {
                name: "Game 2 Position 1",
                gameId: games[1].id,
                positionId: positions[0].id
            },
            {
                name: "Game 3 Position 2",
                gameId: games[2].id,
                positionId: positions[1].id,
                userId: users[1].id
            },
        ]
    })
}

main()
    .catch((e) => {
        console.log(e);
    })
    .finally(async () => {
        prisma.$disconnect;
    });