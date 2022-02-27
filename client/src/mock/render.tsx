import {
    fireEvent,
    act,
    render as rtlRender,
    RenderAPI
} from '@testing-library/react-native'
import React from 'react'
import { Client } from 'urql'

import AppMockProvider from '@/core/App/Mock/Provider'

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
            me: jest.fn(),
            isRegistered: jest.fn(),
            season: jest.fn(),
            organization: jest.fn()
        },
        Mutation: {
            register: jest.fn(),
            sendSignInLink: jest.fn(),
            createPosition: jest.fn(),
            createDivision: jest.fn(),
            deleteDivision: jest.fn(),
            deletePosition: jest.fn(),
            joinOrganization: jest.fn(),
            leaveOrganization: jest.fn(),
            createOrganization: jest.fn(),
            updateOrganization: jest.fn(),
            deleteOrganization: jest.fn()
        }
    }
}

export function createRender(render: (client: Client) => React.ReactElement) {
    const resolvers = stubResolvers()
    const client = createMockClient({ resolvers })
    const element = render(client)
    return {
        ...extendedAPI(rtlRender(element)),
        resolvers,
        client
    }
}

export interface CreateRenderAPI extends RenderAPI {
    resolvers: ReturnType<typeof stubResolvers>
}

export class BaseSetup {
    node: React.ReactNode
    resolvers = stubResolvers()

    constructor(node: React.ReactNode) {
        this.node = node
    }

    render() {
        const client = createMockClient({ resolvers: this.resolvers })
        return rtlRender(
            <AppMockProvider client={client}>{this.node}</AppMockProvider>
        )
    }
}

export const waitForRender = () => act(() => new Promise(process.nextTick))
