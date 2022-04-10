import {
    NavigationProp,
    NavigationState,
    RouteProp
} from '@react-navigation/native'
import { render as rtlRender } from '@testing-library/react-native'
import { ReactNode } from 'react'

import AppNavigationContainer from '@/navigation/Container'
import AppMockProvider from '@/testing/AppMockProvider'

import createMockClient from '../server/client'

import ErrorBoundary from './ErrorBoundary'
import { extendedAPI } from './render'
import TestRenderer from './renderer'
import { stubNavigation, stubResolvers, testRegistery } from './stub'

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

    environment(node: ReactNode, navigationState?: NavigationState) {
        return (
            <AppMockProvider client={this.client}>
                <AppNavigationContainer initialState={navigationState}>
                    {node}
                </AppNavigationContainer>
            </AppMockProvider>
        )
    }

    render(navigationState?: NavigationState) {
        const api = rtlRender(
            <ErrorBoundary>
                {this.environment(this.node, navigationState)}
            </ErrorBoundary>
        )

        return extendedAPI(api)
    }
}

export function parameratizableScreenSetup<
    TScreenProp extends {
        route: RouteProp<any, any>
        navigation: NavigationProp<any, any>
    }
>(Screen: any) {
    return () => {
        const registery = testRegistery()
        const renderer = new TestRenderer(registery.client)

        return {
            ...registery,
            render: (params: TScreenProp['route']['params']) =>
                renderer.render(
                    <Screen
                        navigation={registery.navigation}
                        route={{
                            params
                        }}
                    />
                )
        }
    }
}

export function createIntegratedRenderer() {
    const navigation = stubNavigation()
    const resolvers = stubResolvers()
    const client = createMockClient({
        mocks: {
            DateTime: () => new Date().toISOString()
        },
        resolvers
    })

    const renderer = new TestRenderer(client)

    return {
        navigation,
        resolvers,
        client,
        renderer
    }
}
