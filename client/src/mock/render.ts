import {
    fireEvent,
    act,
    render as rtlRender,
    RenderAPI
} from '@testing-library/react-native'
import { Client } from 'urql'

import createMockClient from './client'

export const extendedAPI = (utils: RenderAPI) => ({
    ...utils,
    fillForm: async (input: Record<string, string>) => {
        /* eslint-disable */
        for (const [field, value] of Object.entries(input)) {
            const inputElement = await utils.findByTestId(`${field}-input`)
            fireEvent.changeText(inputElement, value)
        }
        /* eslint-enable */
    }
})

export function stubResolvers() {
    return {
        Query: {
            isRegistered: jest.fn(),
            season: jest.fn()
        },
        Mutation: {
            register: jest.fn(),
            sendSignInLink: jest.fn(),
            createPosition: jest.fn(),
            createDivision: jest.fn(),
            deleteDivision: jest.fn()
        }
    }
}

export function createRender(render: (client: Client) => JSX.Element) {
    const resolvers = stubResolvers()
    const element = render(createMockClient({ resolvers }))
    return {
        ...extendedAPI(rtlRender(element)),
        resolvers
    }
}

export interface CreateRenderAPI extends RenderAPI {
    resolvers: ReturnType<typeof stubResolvers>
}

export const waitForRender = () => act(() => new Promise(process.nextTick))