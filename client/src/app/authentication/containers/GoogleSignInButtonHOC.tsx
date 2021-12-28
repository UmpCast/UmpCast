import useGoogleAuthRequest from '../hooks/useGoogleAuthRequest'
import * as SignInText from '../components/SignInText'
import GenericSignInButton from '../components/GenericSignInButton'

export default function GoogleSignInButtonHOC() {
    const { prepared, login } = useGoogleAuthRequest()
    return (
        <GenericSignInButton disabled={!prepared} onPress={login}>
            <SignInText.Google />
        </GenericSignInButton>
    )
}
