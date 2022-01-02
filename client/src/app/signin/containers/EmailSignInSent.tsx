import { useRoute, RouteProp } from '@react-navigation/native'
import { AppStackParamList } from '@/app/navigation/components/AppStack'
import EmailSignInSent from '../components/EmailSignInSentView'
import { SignInRoutes } from '../utils/signInNavigation'

type EmailSignInSentScreenProps = RouteProp<
    AppStackParamList,
    SignInRoutes.EmailSignInSent
>

export default function EamilSignInSentViewHOC() {
    const route = useRoute<EmailSignInSentScreenProps>()
    return <EmailSignInSent email={route.params.email} />
}
