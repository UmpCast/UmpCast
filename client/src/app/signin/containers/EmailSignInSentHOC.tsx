import { useRoute, RouteProp } from '@react-navigation/native'
import EmailSignInSent from '../components/EmailSignInSent'
import { UnauthStackParamList, UnauthRoutes } from './UnauthStack'

type EmailSignInSentScreenProps = RouteProp<
    UnauthStackParamList,
    UnauthRoutes.EmailSignInSent
>

export default function EamilSignInSentViewHOC() {
    const route = useRoute<EmailSignInSentScreenProps>()
    return <EmailSignInSent email={route.params.email} />
}
