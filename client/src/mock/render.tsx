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
import { Season } from '@/generated'

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

type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>
      }
    : T

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
            updateOrganization: jest.fn()
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

    client = createMockClient({
        mocks: {
            DateTime: () => '2000-01-01T08:00:00.000Z'
        },
        resolvers: this.resolvers
    })

    constructor(node: React.ReactNode) {
        this.node = node
    }

    render() {
        const api = rtlRender(
            <AppMockProvider client={this.client}>{this.node}</AppMockProvider>
        )
        return extendedAPI(api)
    }
}

export const waitForRender = () => act(() => new Promise(process.nextTick))
