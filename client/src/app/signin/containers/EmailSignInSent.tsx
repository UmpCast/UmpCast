import { useRoute, RouteProp } from '@react-navigation/native'
import { AppStackParamList } from '@/app/navigation/components/AppStack'
import EmailSignInSentView from '../components/EmailSignInSentView'
import { SignInRoutes } from '../utils/signInNavigation'

type EmailSignInSentScreenProps = RouteProp<
    AppStackParamList,
    SignInRoutes.EmailSignInSent
>

export default function EmailSignInSent() {
    const route = useRoute<EmailSignInSentScreenProps>()
    return <EmailSignInSentView email={route.params.email} />
}
