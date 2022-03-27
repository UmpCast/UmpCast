import useAuthEmailReceiveLoginLinkEffect from '@/features/AuthEmail/core/ReceiveSignInLink/useEffect'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'

type Props = RootStackScreenProps<RootStackRoute.LoginLink>

export default function LoginLinkScreen({ route }: Props) {
    const { params } = route
    useAuthEmailReceiveLoginLinkEffect({ params })

    return null
}
