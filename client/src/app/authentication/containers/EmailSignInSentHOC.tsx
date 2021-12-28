import { useRoute, RouteProp } from '@react-navigation/native'

import EmailVerifSentView from '../components/EmailSignInSent'
import { UnauthRoutes, UnauthStackParamList } from './UnauthStack'

type EmailSignInSentScreenProps = RouteProp<
    UnauthStackParamList,
    UnauthRoutes.EmailSignInSent
>

export default function EmailVerifSentViewHOC() {
    const route = useRoute<EmailSignInSentScreenProps>()
    return <EmailVerifSentView email={route.params.email} />
}
