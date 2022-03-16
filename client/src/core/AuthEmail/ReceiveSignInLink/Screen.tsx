import {
    RootStackParamList,
    RootStackRoutes
} from '@/config/navigation/navigators/AppRootStackTypes'
import useAuthSignInReceiveEmailLinkMountEffect from '@/core/AuthEmail/ReceiveSignInLink/useMountEffect'
import { StackScreenProps } from '@react-navigation/stack'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.AuthEmailReceiveLink
>

export default function AuthEmailReceiveSignInLinkScreen({ route }: Props) {
    const { params } = route
    useAuthSignInReceiveEmailLinkMountEffect({ params })

    return null
}
