import useFacebookAuthRequest from '../hooks/useFacebookAuthRequest'
import FacebookButton from '../components/FacebookSignInButton'

export default function FacebookSignInButtonHOC() {
    const { request, promptAsync } = useFacebookAuthRequest()

    return (
        <FacebookButton
            disabled={!request}
            onPress={promptAsync}
            title="Sign in with Facebook"
        />
    )
}
