import { useRoute, RouteProp } from '@react-navigation/native'

import EmailSignInSent from '../components/EmailSignInSent'
import { UnauthRoutes, UnauthStackParamList } from './UnauthStack'

type EmailSignInSentScreenProps = RouteProp<
    UnauthStackParamList,
    UnauthRoutes.EmailSignInSent
>

export default function EmailVerifSentViewHOC() {
    const route = useRoute<EmailSignInSentScreenProps>()
    return <EmailSignInSent email={route.params.email} />
}
