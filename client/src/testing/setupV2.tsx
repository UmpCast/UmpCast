import { render as rtlRender } from '@testing-library/react-native'
import React, { FC, ReactNode } from 'react'

import AppNavigationContainer from '@/navigation/Container'
import {
    RootStackParamList,
    RootStackRoute
} from '@/navigation/navigators/Root/Stack'
import AppMockProvider from '@/testing/AppMockProvider'

import createMockClient from '../server/client'

import ErrorBoundary from './ErrorBoundary'
import { extendedAPI } from './render'
import { stubResolvers } from './stubResolvers'

export class ComponentSetup {
    component: FC<any>

    resolvers = stubResolvers()

    client = createMockClient({
        mocks: {
            DateTime: () => '2000-01-01T08:00:00.000Z'
        },
        resolvers: this.resolvers
    })

    constructor(component: FC<any>) {
        this.component = component
    }

    environment(node: ReactNode) {
        return (
            <AppMockProvider client={this.client}>
                <AppNavigationContainer>{node}</AppNavigationContainer>
            </AppMockProvider>
        )
    }

    render(props: any) {
        const api = rtlRender(
            <ErrorBoundary>
                {this.environment(React.createElement(this.component, props))}
            </ErrorBoundary>
        )

        return extendedAPI(api)
    }
}

export class ScreenSetup<
    TParamList extends { [k: string]: any },
    TRoute extends string
> extends ComponentSetup {
    navigation = {
        navigate: jest.fn(),
        goBack: jest.fn()
    }

    render(params: TParamList[TRoute]) {
        return super.render({
            route: {
                params
            },
            navigation: this.navigation
        })
    }
}
