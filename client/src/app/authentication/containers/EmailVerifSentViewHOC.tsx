import { useRoute, RouteProp } from '@react-navigation/native'

import EmailVerifSentView from '../components/EmailVerifSentView'
import { UnauthStackParamList } from './UnauthStack'

type SentVerificationScreenProps = RouteProp<
    UnauthStackParamList,
    'VerificationSent'
>

export default function EmailVerifSentViewHOC() {
    const route = useRoute<SentVerificationScreenProps>()
    return <EmailVerifSentView email={route.params.email} />
}
