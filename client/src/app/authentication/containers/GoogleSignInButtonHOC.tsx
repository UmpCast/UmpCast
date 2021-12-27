import GoogleSignInButton from '../components/GoogleSignInButton'
import useGoogleAuthRequest from '../hooks/useGoogleAuthRequest'

export default function GoogleSignInButtonHOC() {
    const { prepared, login } = useGoogleAuthRequest()
    return (
        <GoogleSignInButton
            disabled={!prepared}
            onPress={login}
            title="Sign in with Google"
        />
    )
}
