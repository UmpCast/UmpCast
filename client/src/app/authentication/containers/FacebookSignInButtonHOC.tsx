import useFacebookAuthRequest from '../hooks/useFBAuthRequest'
import FacebookButton from '../components/FacebookSignInButton'

export default function FacebookSignInButtonHOC() {
    const { prepared, login } = useFacebookAuthRequest()

    return (
        <FacebookButton
            disabled={!prepared}
            onPress={login}
            title="Sign in with Facebook"
        />
    )
}
