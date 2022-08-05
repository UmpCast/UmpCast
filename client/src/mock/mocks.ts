import { faker } from '@faker-js/faker'
import { addHours } from 'date-fns'

import {
    User,
    Game,
    Season,
    GameListing,
    Organization,
    Division,
    SeasonParticipantEdge,
    SeasonParticipationPermit
} from '@/graphql/generated'
import { DeepPartial } from '@/utils/primitive'

faker.seed(12)

export type ServerMocks = {
    DateTime(): string
    User(): DeepPartial<User>
    Organization(): DeepPartial<Organization>
    Season(): DeepPartial<Season>
    Division(): DeepPartial<Division>
    Game(): DeepPartial<Game>
    GameListing(): DeepPartial<GameListing>
    SeasonParticipantEdge(): DeepPartial<SeasonParticipantEdge>
    SeasonParticipationPermit(): DeepPartial<SeasonParticipationPermit>
}

const n = () => faker.datatype.number({ max: 100 })

const serverMocks: ServerMocks = {
    DateTime() {
        return new Date().toISOString()
    },
    User() {
        return {
            id: faker.datatype.uuid(),
            profilePictureUrl: faker.internet.emoji(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            city: faker.address.city(),
            streetAddress: faker.address.street(),
            zipCode: faker.address.zipCode(),
            state: faker.address.state(),
            phoneNumber: faker.phone.number()
        }
    },
    Organization() {
        return {
            name: `Organization ${n()}`,
            logoUrl: faker.image.business()
        }
    },
    Season() {
        return {
            name: `Season ${n()}`
        }
    },
    SeasonParticipantEdge() {
        return {
            viewerCanReadSensitiveDetails: true,
            viewerCanUpdateVisibility: true
        }
    },
    SeasonParticipationPermit() {
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
            name: `Team ${n()} vs Team ${n()}`,
            startTime: startTime.toISOString(),
            endTime: addHours(startTime, 2).toISOString(),
            location: faker.address.streetAddress(),
            listings: [{}, {}, {}]
        }
    },
    GameListing() {
        return {
            assignee: {},
            name: `Role ${n()}`,
            position: {},
            canAssignSelf: true,
            canChangeAssignee: true,
            availableAssignees: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        }
    }
}

export default serverMocks
