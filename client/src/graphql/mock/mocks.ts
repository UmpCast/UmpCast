import { faker } from '@faker-js/faker'
import { addHours } from 'date-fns'

import {
    User,
    Game,
    Season,
    GameListing,
    Organization,
    Division
} from '@/generated'
import { DeepPartial } from '@/utils/primitive'

faker.seed(1)

export type ServerMocks = {
    DateTime(): string
    User(): DeepPartial<User>
    Organization(): DeepPartial<Organization>
    Season(): DeepPartial<Season>
    Division(): DeepPartial<Division>
    Game(): DeepPartial<Game>
    GameListing(): DeepPartial<GameListing>
}

const n = () => faker.datatype.number({ max: 100 })

const serverMocks: ServerMocks = {
    DateTime() {
        return new Date().toISOString()
    },
    User() {
        return {
            id: faker.datatype.uuid(),
            profilePictureUrl: faker.internet.avatar(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email()
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
            canChangeAssignee: true
        }
    }
}

export default serverMocks
