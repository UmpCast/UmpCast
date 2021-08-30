import React from 'react'

import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react-native'
import { Text } from 'native-base'

import ClientCache from 'app/cache'
import { networkErrorVar } from 'app/cache/reactiveVars'
import { MockNetworkError } from 'app/links/models/__mocks__/networkError'
import MockNativeBaseProvider from 'utils/__mocks__/mockNativeBaseProvider'

import NetworkProvider from '../containers/networkProvider'



describe('networkErrorProvider Component', () => {
    it('displays a toast with the title, when networkErrorVar updated', async () => {
        jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

        const mockNetworkError = MockNetworkError.build()

        const { findByText } = render(
            <MockedProvider cache={new ClientCache()}>
                <NetworkProvider>
                    <Text>placeholder</Text>
                </NetworkProvider>
            </MockedProvider>,
            { wrapper: MockNativeBaseProvider }
        )

        await waitFor(async () =>
            expect(await findByText('placeholder')).toBeTruthy()
        )
        networkErrorVar(mockNetworkError)
        expect(findByText(mockNetworkError.name)).toBeTruthy()
    })
})
