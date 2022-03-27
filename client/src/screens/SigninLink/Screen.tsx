import useAuthEmailReceiveSignInLinkEffect from '@/features/AuthEmail/core/ReceiveSignInLink/useEffect'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'

type Props = RootStackScreenProps<RootStackRoute.SigninLink>

export default function SignInLinkScreen({ route }: Props) {
    const { params } = route
    useAuthEmailReceiveSignInLinkEffect({ params })

    return null
}
