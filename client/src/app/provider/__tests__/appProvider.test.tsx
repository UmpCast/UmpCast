import React from 'react'

import {
    render,
    waitFor
} from '@testing-library/react-native'
import { Text } from 'native-base'

import MockNativeBaseProvider from 'utils/__mocks__/mockNativeBaseProvider'

import AppProvider from '..'
import * as utils from '../providerUtils'

describe('AppProvider', () => {
    it('displays a splash until app is initialized, when on Web', async () => {
        jest.useFakeTimers()
        jest.mock('react-native/Libraries/Utilities/Platform', () => ({
            OS: 'Web'
        }))

        const fakeInitialize = Promise.resolve()
        jest.spyOn(utils, 'initializeApp').mockResolvedValue(fakeInitialize)

        const { queryByText } = render(
            <AppProvider>
                <Text>placeholder</Text>
            </AppProvider>,
            { wrapper: MockNativeBaseProvider }
        )

        await waitFor(() => expect(queryByText('UmpCast')).not.toBeNull())
        await waitFor(() => fakeInitialize)
        await waitFor(() => expect(queryByText('UmpCast')).toBeNull())
        expect(queryByText('placeholder')).not.toBeNull()
    })
})
