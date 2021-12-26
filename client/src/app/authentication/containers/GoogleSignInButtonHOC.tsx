import GoogleSignInButton from '../components/GoogleSignInButton'
import useGoogleAuthRequest from '../hooks/useGoogleAuthRequest'

export default function GoogleSignInButtonHOC() {
    const { request, promptAsync } = useGoogleAuthRequest()
    return (
        <GoogleSignInButton
            disabled={!request}
            onPress={promptAsync}
            title="Sign in with Google"
        />
    )
}
