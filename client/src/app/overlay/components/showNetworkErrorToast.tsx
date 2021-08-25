import React from 'react'

import { Toast, Text } from 'native-base'

import NetworkError from '../../links/models/networkError'

export default function showNetworkErrorToast(networkError: NetworkError) {
    const { name, message } = networkError
    const title = <Text bold fontSize="sm">{`${name}: ${message}`}</Text>

    Toast.show({
        title,
        placement: 'top',
        status: 'error',
        isClosable: false,
        minWidth: '100%'
    })
}
