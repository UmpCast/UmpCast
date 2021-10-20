import React from 'react'

import * as WebBrowser from 'expo-web-browser'

import GoogleLoginButton from '../components/googleLoginButton'
import useGoogleAuthRequest from '../hooks/useGoogleAuthRequest'
import useSocialLogin from '../hooks/useSocialLogin'

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
    const [request, response, promptAsync] = useGoogleAuthRequest()
    const loading = useSocialLogin(response)

    return (
        <GoogleLoginButton
            disabled={!request || loading}
            onPress={promptAsync}
        />
    )
}
