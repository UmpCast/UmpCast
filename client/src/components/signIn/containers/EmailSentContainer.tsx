import { useRoute, RouteProp } from '@react-navigation/native'

import { RootStackParamList, RootStackRoutes } from '@/navigation/rootStack'

import SignInEmailSentView from '../views/EmailSentView'

type EmailSentScreenProps = RouteProp<
    RootStackParamList,
    RootStackRoutes.SignInEmailSent
>

export default function EmailSentContainer() {
    const route = useRoute<EmailSentScreenProps>()
    return <SignInEmailSentView email={route.params.email} />
}
