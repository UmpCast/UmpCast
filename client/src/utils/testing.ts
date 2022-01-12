import urqlMockingClient from './urql'
import { render as rtlRender } from '@testing-library/react-native'
import { Client } from 'urql'

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

export function createRender(render: (client: Client) => JSX.Element) {
    const resolvers = stubResolvers()
    const element = render(urqlMockingClient({ resolvers }))
    return {
        ...rtlRender(element),
        resolvers
    }
}

export const PlATFORMS: Array<'web' | 'mobile'> = ['web', 'mobile']
