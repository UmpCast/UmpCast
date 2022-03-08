import { Season } from '@/generated'
import { DeepPartial } from '@/utils/object'

export function stubResolvers() {
    return {
        Query: {
            isRegistered: jest.fn(),
            me: jest.fn(),
            organization: jest.fn(),
            season: jest.fn<DeepPartial<Season>, any>()
        },
        Mutation: {
            createDivision: jest.fn(),
            createOrganization: jest.fn(),
            createPosition: jest.fn(),
            createSeason: jest.fn(),
            deleteDivision: jest.fn(),
            deleteOrganization: jest.fn(),
            deletePosition: jest.fn(),
            joinOrganization: jest.fn(),
            leaveOrganization: jest.fn(),
            register: jest.fn(),
            sendSignInLink: jest.fn(),
            updateOrganization: jest.fn(),
            removeSeasonMember: jest.fn(),
            addSeasonMembers: jest.fn(),
            updateSeason: jest.fn()
        }
    }
}
