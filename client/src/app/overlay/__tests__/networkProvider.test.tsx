import React from 'react'

import { MockedProvider } from '@apollo/client/testing'
import { render } from '@testing-library/react-native'
import { Text } from 'native-base'


import { MockNetworkError } from 'app/links/models/__mocks__/networkError'
import { clientCache, networkErrorVar } from 'global/client'
import MockNativeBaseProvider from 'utils/__mocks__/mockNativeBaseProvider'
import waitFor from 'utils/__mocks__/waitFor'

import NetworkProvider from '../containers/networkProvider'

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

describe('networkErrorProvider Component', () => {
    it('displays a toast with the title, when networkErrorVar updated', async () => {
        jest.useFakeTimers()

        const mockNetworkError = MockNetworkError.build()
        const toastMatch = new RegExp(mockNetworkError.name)

        const { getByText } = render(
            <MockNativeBaseProvider>
                <MockedProvider cache={clientCache}>
                    <NetworkProvider>
                        <Text>placeholder</Text>
                    </NetworkProvider>
                </MockedProvider>
            </MockNativeBaseProvider>
        )

        await waitFor(async () => getByText('placeholder'))

        networkErrorVar(mockNetworkError)

        await waitFor(() => getByText(toastMatch))

        jest.advanceTimersByTime(4500)

        await waitFor(() => expect(() => getByText(toastMatch)).toThrow())
    })
})
