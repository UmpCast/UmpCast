import { render as rtlRender } from '@testing-library/react-native'
import { ReactNode } from 'react'
import type { Client } from 'urql'

import AppNavigationContainer from '@/navigation/Container'
import AppMockProvider from '@/testing/AppMockProvider'

import ErrorBoundary from './ErrorBoundary'
import { extendedAPI } from './render'

export default class TestRenderer {
    constructor(private client: Client) {}

    environment(node: ReactNode) {
        return (
            <AppMockProvider client={this.client}>
                <AppNavigationContainer>{node}</AppNavigationContainer>
            </AppMockProvider>
        )
    }

    render(node: ReactNode) {
        const api = rtlRender(
            <ErrorBoundary>{this.environment(node)}</ErrorBoundary>
        )

        return extendedAPI(api)
    }
}
