import useFacebookAuthRequest from '@/hooks/useFBAuthRequest'

import * as ContinueText from '../views/ContinueText'
import SignInGenericButton from '../views/GenericButton'

export default function FacebookSignInButtonHOC() {
    const { prepared, login } = useFacebookAuthRequest()

    return (
        <SignInGenericButton disabled={!prepared} onPress={login}>
            <ContinueText.Facebook />
        </SignInGenericButton>
    )
}
