import useGoogleAuthRequest from '../../../hooks/useGoogleAuthRequest'
import * as ContinueText from '../views/ContinueText'
import SignInGenericButton from '../views/GenericButton'

export default function GoogleSignInButtonHOC() {
    const { prepared, login } = useGoogleAuthRequest()
    return (
        <SignInGenericButton disabled={!prepared} onPress={login}>
            <ContinueText.Google />
        </SignInGenericButton>
    )
}
