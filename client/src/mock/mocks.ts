import { faker } from '@faker-js/faker'
import { addHours } from 'date-fns'
import { User } from 'firebase/auth'

import { DeepPartial } from '@/utils/primitive'

import {
    Organization,
    Season,
    Division,
    Game,
    GameListing,
    SeasonParticipantPermit,
    Position,
    OrganizationMemberRoleType,
    SeasonParticipantRoleType
} from './schema.generated'

export type ServerMocks = {
    DateTime(): string
    User(): DeepPartial<User>
    Organization(): DeepPartial<Organization>
    Season(): DeepPartial<Season>
    Division(): DeepPartial<Division>
    Game(): DeepPartial<Game>
    GameListing(): DeepPartial<GameListing>
    SeasonParticipantPermit(): DeepPartial<SeasonParticipantPermit>
    Position(): DeepPartial<Position>
}

const n = () => faker.datatype.number(200)

const serverMocks: ServerMocks = {
    DateTime() {
        return new Date().toISOString()
    },
    User() {
        return {
            id: faker.datatype.uuid(),
            profilePictureUrl: faker.image.avatar(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            fullAddress: faker.address.secondaryAddress(),
            phoneNumber: faker.phone.number(),
            assignedListings: [
                {
                    id: '0',
                    game: {
                        id: '0',
                        startTime: new Date().toISOString()
                    }
                },
                {
                    id: '1',
                    game: {
                        id: '1',
                        startTime: new Date().toISOString()
                    }
                }
            ]
        }
    },
    Organization() {
        return {
            id: faker.datatype.uuid(),
            name: `Organization ${n()}`,
            logoUrl: faker.image.city(undefined, undefined, true),
            websiteUrl: faker.internet.url(),
            email: faker.internet.email(),
            viewerMemberRole: OrganizationMemberRoleType.Owner,
            seasons: [{}, {}, {}]
        }
    },
    Position() {
        return {
            id: faker.datatype.uuid(),
            name: `Position ${n()}`
        }
    },
    Season() {
        return {
            id: faker.datatype.uuid(),
            name: `Season ${n()}`,
            divisions: ['AAA', 'PCL', 'Majors'].map((name) => ({
                name,
                positions: [
                    {
                        name: 'Base'
                    },
                    {
                        name: 'Plate'
                    }
                ]
            })),
            viewerParticipantRole: SeasonParticipantRoleType.Manager,
            participant: {
                viewerCanSeeRefereeDetails: true,
                user: {
                    isViewer: false
                },
                permit: {
                    viewerCanUpdate: true
                }
            },
            viewerCanManage: true
        }
    },
    SeasonParticipantPermit() {
        return {
            visibility: [
                ['AAA', 'Base'],
                ['AAA', 'Plate'],
                ['PCL', 'Base'],
                ['PCL', 'Plate'],
                ['Majors', 'Base'],
                ['Majors', 'Plate']
            ].map(([divName, posName]) => ({
                position: {
                    name: posName,
                    division: {
                        name: divName
                    }
                },
                visible: true
            }))
        }
    },
    Division() {
        return {
            id: faker.datatype.uuid(),
            name: `Division ${n()}`,
            positions: [{}, {}]
        }
    },
    Game() {
        const startTime = faker.date.between(
            '2022-07-01T07:00:00.000Z',
            '2022-08-01T07:00:00.000Z'
        )

        return {
            id: faker.datatype.uuid(),
            name: `Team ${n()} vs Team ${n()}`,
            startTime: startTime.toISOString(),
            endTime: addHours(startTime, 2).toISOString(),
            location: faker.address.streetAddress(),
            listings: [
                {
                    name: 'Base',
                    assignee: null,
                    canAssignSelf: false,
                    canChangeAssignee: true
                },
                {
                    name: 'Plate',
                    assignee: {}
                }
            ]
        }
    },
    GameListing() {
        return {
            id: faker.datatype.uuid(),
            assignee: {},
            name: `Position ${n()}`,
            position: {},
            canAssignSelf: true,
            canChangeAssignee: true,
            availableAssignees: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        }
    }
}

export default serverMocks
