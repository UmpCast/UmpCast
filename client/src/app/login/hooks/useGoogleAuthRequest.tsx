import { useAuthRequest } from 'expo-auth-session/providers/google'

import { GOOGLE_GUID_WEB } from '../constants'

const useGoogleAuthRequest = () =>
    useAuthRequest({
        expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: `${GOOGLE_GUID_WEB}.apps.googleusercontent.com`
    })

export default useGoogleAuthRequest
