import { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import refreshAccessTokenHandler from './refreshAccessTokenHandler'

export const restoreAuthentication = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken')
    if (refreshToken) refreshAccessTokenHandler(refreshToken)
}

const useInitializedAuth = () => {
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        restoreAuthentication().finally(() => setInitialized(true))
    }, [])

    return initialized
}

export default useInitializedAuth
