import { Organization, Season, User } from '@/generated'
import { DeepPartial } from '@/utils/object'

export function stubResolvers() {
    return {
        Query: {
            viewer: jest.fn<DeepPartial<User> | null, any>(),
            organization: jest.fn<DeepPartial<Organization> | null, any>(),
            season: jest.fn<DeepPartial<Season> | null, any>()
        },
        Mutation: {
            createDivision: jest.fn(),
            createOrganization: jest.fn(),
            createPosition: jest.fn(),
            createSeason: jest.fn(),
            createUser: jest.fn(),
            deleteDivision: jest.fn(),
            deleteOrganization: jest.fn(),
            deletePosition: jest.fn(),
            joinOrganization: jest.fn(),
            leaveOrganization: jest.fn(),
            sendSignInLink: jest.fn(),
            updateOrganization: jest.fn(),
            removeSeasonParticipant: jest.fn(),
            addSeasonParticipants: jest.fn(),
            updateSeason: jest.fn()
        }
    }
}
