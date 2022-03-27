import useAuthEmailReceiveSignInLinkEffect from '@/features/AuthEmail/core/ReceiveSignInLink/useEffect'
import { AppRootStackRoute } from '@/navigation/navigators/Root/Stack'
import { AppRootStackScreenProps } from '@/navigation/screenProps'

type Props = AppRootStackScreenProps<AppRootStackRoute.AuthEmailReceiveLink>

export default function AuthEmailReceiveSignInLinkScreen({ route }: Props) {
    const { params } = route
    useAuthEmailReceiveSignInLinkEffect({ params })

    return null
}
