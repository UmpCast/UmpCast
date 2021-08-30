import React from 'react'

import { render } from '@testing-library/react-native'
import { Text } from 'native-base'

import MockNativeBaseProvider from 'utils/__mocks__/mockNativeBaseProvider'
import waitForFixed from 'utils/__mocks__/waitFor'

import AppProvider from '..'

describe('AppProvider', () => {
    it('displays a splash until app is initialized, when on Web', async () => {
        jest.useFakeTimers()
        jest.mock('react-native/Libraries/Utilities/Platform', () => ({
            OS: 'Web'
        }))

        const { queryByText } = render(
            <AppProvider>
                <Text>placeholder</Text>
            </AppProvider>,
            { wrapper: MockNativeBaseProvider }
        )

        await waitForFixed(() => expect(queryByText('UmpCast')).not.toBeNull())
        await waitForFixed(() => expect(queryByText('UmpCast')).toBeNull())
        expect(queryByText('placeholder')).not.toBeNull()
    })
})
