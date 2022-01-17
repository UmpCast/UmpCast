import {
    act,
    render as rtlRender,
    RenderAPI
} from '@testing-library/react-native'
import { Client } from 'urql'

import urqlMockingClient from '@/utils/dev/urql'

export function stubResolvers() {
    return {
        Query: {
            isRegistered: jest.fn(),
            season: jest.fn()
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

export interface CreateRenderAPI extends RenderAPI {
    resolvers: ReturnType<typeof stubResolvers>
}

export const waitForRender = () => act(() => new Promise(process.nextTick))

export const PlATFORMS: Array<'web' | 'mobile'> = ['web', 'mobile']
