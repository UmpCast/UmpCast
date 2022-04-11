import useAuthEmailReceiveLoginLinkMountEffect from '@/features/AuthEmail/core/ReceiveSignInLink/useMountEffect'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'

type Props = RootStackScreenProps<RootStackRoute.LoginLink>

export default function LoginLinkScreen({ route }: Props) {
    const { params } = route
    useAuthEmailReceiveLoginLinkMountEffect({ params })

    return null
}
