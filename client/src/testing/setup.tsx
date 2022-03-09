import { render as rtlRender } from '@testing-library/react-native'
import { ReactNode } from 'react'

import AppMockProvider from '@/core/App/Mock/Provider'
import AppNavigationContainer from '@/core/App/Navigation/Container'

import createMockClient from '../server/client'
import { stubResolvers } from '../server/stubResolvers'

import ErrorBoundary from './ErrorBoundary'
import { extendedAPI } from './render'

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
            <ErrorBoundary>{this.environment(this.node)}</ErrorBoundary>
        )
        return extendedAPI(api)
    }
}
