import useFacebookAuthRequest from '@/hooks/useFBAuthRequest'

import * as ContinueText from '../views/ContinueText'
import GenericButton from '../views/GenericButton'

export default function FacebookButtonContainer() {
    const { prepared, login } = useFacebookAuthRequest()

    return (
        <GenericButton disabled={!prepared} onPress={login}>
            <ContinueText.Facebook />
        </GenericButton>
    )
}
