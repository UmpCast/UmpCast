import {
    act,
    render as rtlRender,
    RenderAPI
} from '@testing-library/react-native'
import { Client } from 'urql'
import { MachineConfig, createMachine } from 'xstate'

import urqlMockingClient from '@/utils/dev/urql'

export function stubResolvers() {
    return {
        Query: {
            isRegistered: jest.fn(),
            season: jest.fn()
        },
        Mutation: {
            register: jest.fn(),
            sendSignInLink: jest.fn(),

            deleteDivision: jest.fn()
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

export function createTestMachine(
    config: MachineConfig<any, any, any>,
    tests: Record<string, (api: CreateRenderAPI) => Promise<void> | void>
) {
    const newConfig = {
        ...config,
        states: Object.entries(config.states ?? {}).reduce(
            (prevStates, [field, value]) => ({
                ...prevStates,
                [field]: {
                    ...value,
                    meta: {
                        ...value?.meta,
                        test: tests[field]
                    }
                }
            }),
            {}
        )
    }
    return createMachine(newConfig)
}

export const waitForRender = () => act(() => new Promise(process.nextTick))

export const PlATFORMS: Array<'web' | 'mobile'> = ['web', 'mobile']
