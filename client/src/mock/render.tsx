import {
    fireEvent,
    act,
    render as rtlRender,
    RenderAPI,
    waitFor
} from '@testing-library/react-native'
import React, { ComponentType, ReactNode } from 'react'
import { Client } from 'urql'

import AppMockProvider from '@/core/App/Mock/Provider'
import { Season } from '@/generated'

import createMockClient from './client'
import ErrorBoundary from './ErrorBoundary'
import AppNavigationContainer from '@/core/App/Navigation/Container'

export const extendedAPI = (api: RenderAPI) => ({
    ...api,
    fillForm: async (input: Record<string, string>) => {
        /* eslint-disable */
        for (const [field, value] of Object.entries(input)) {
            const inputElement = await api.findByTestId(`${field}-input`)
            fireEvent.changeText(inputElement, value)
        }
        /* eslint-enable */
    },
    repeatedDebug: () =>
        waitFor(
            () => {
                api.debug()
                return Promise.reject()
            },
            { timeout: 500, interval: 100 }
        )
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
            updateOrganization: jest.fn(),
            removeSeasonMember: jest.fn(),
            addSeasonMembers: jest.fn()
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
    node: ReactNode

    resolvers = stubResolvers()

    client = createMockClient({
        mocks: {
            DateTime: () => '2000-01-01T08:00:00.000Z'
        },
        resolvers: this.resolvers
    })

    constructor(node: ReactNode) {
        this.node = node
    }

    environment(node: ReactNode) {
        return (
            <AppMockProvider client={this.client}>
                <AppNavigationContainer>{node}</AppNavigationContainer>
            </AppMockProvider>
        )
    }

    render() {
        const api = rtlRender(
            <ErrorBoundary>{this.environment(this.node)} </ErrorBoundary>
        )
        return extendedAPI(api)
    }
}

export const waitForRender = () => act(() => new Promise(process.nextTick))
