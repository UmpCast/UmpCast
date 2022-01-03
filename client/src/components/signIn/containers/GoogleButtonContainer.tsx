import useGoogleAuthRequest from '@/hooks/useGoogleAuthRequest'

import * as ContinueText from '../views/ContinueText'
import GenericButton from '../views/GenericButton'

export default function GoogleButtonContainer() {
    const { prepared, login } = useGoogleAuthRequest()
    return (
        <GenericButton disabled={!prepared} onPress={login}>
            <ContinueText.Google />
        </GenericButton>
    )
}
