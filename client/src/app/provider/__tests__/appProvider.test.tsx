import React from 'react'

import { render, waitFor } from '@testing-library/react-native'
import { Text } from 'native-base'

import MockNativeBaseProvider from 'utils/__mocks__/mockNativeBaseProvider'

import AppProvider from '..'
import * as utils from '../providerUtils'

describe('AppProvider', () => {
    it('displays a splash until app is initialized, when on Web', async () => {
        jest.mock('react-native/Libraries/Utilities/Platform', () => ({
            OS: 'Web'
        }))
        jest.useFakeTimers()

        jest.spyOn(utils, 'initializeApp').mockResolvedValue(
            new Promise((resolve) => setTimeout(resolve, 200))
        )

        const { queryByText } = render(
            <AppProvider>
                <Text>placeholder</Text>
            </AppProvider>,
            { wrapper: MockNativeBaseProvider }
        )

        await waitFor(() => expect(queryByText('UmpCast')).not.toBeNull())
        await waitFor(() => expect(queryByText('UmpCast')).toBeNull())
        await waitFor(() => expect(queryByText('placeholder')).not.toBeNull())
    })
})
