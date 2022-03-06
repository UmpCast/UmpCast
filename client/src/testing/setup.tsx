import { render as rtlRender } from '@testing-library/react-native'
import { ReactNode } from 'react'
import AppMockProvider from '@/core/App/Mock/Provider'
import createMockClient from '../server/client'
import ErrorBoundary from './ErrorBoundary'
import AppNavigationContainer from '@/core/App/Navigation/Container'
import { stubResolvers } from '../server/stubResolvers'
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
            <ErrorBoundary>{this.environment(this.node)} </ErrorBoundary>
        )
        return extendedAPI(api)
    }
}
