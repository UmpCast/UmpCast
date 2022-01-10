export function stubResolvers() {
    return {
        Query: {
            isRegistered: jest.fn()
        },
        Mutation: {
            register: jest.fn(),
            sendSignInLink: jest.fn()
        }
    }
}

export const PlATFORMS: Array<'web' | 'mobile'> = ['web', 'mobile']
