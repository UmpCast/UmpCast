import { useRoute, RouteProp } from '@react-navigation/native'
import EmailSignInSent from '../components/EmailSignInSent_'
import { UnauthStackParamList, UnauthRoutes } from '../components/UnauthStack'

type EmailSignInSentScreenProps = RouteProp<
    UnauthStackParamList,
    UnauthRoutes.EmailSignInSent
>

export default function EamilSignInSentViewHOC() {
    const route = useRoute<EmailSignInSentScreenProps>()
    return <EmailSignInSent email={route.params.email} />
}
