import useFacebookAuthRequest from '../hooks/useFBAuthRequest'
import * as SigninText from '../components/SignInText'
import GenericSignInButton from '../components/GenericSignInButton'

export default function FacebookSignInButtonHOC() {
    const { prepared, login } = useFacebookAuthRequest()

    return (
        <GenericSignInButton disabled={!prepared} onPress={login}>
            <SigninText.Facebook />
        </GenericSignInButton>
    )
}
