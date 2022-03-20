import { StackScreenProps } from '@react-navigation/stack'

import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import useAuthEmailReceiveSignInLinkMountEffect from '@/core/AuthEmail/ReceiveSignInLink/useMountEffect'

type Props = StackScreenProps<
    AppRootStackParamList,
    AppRootStackRoute.AuthEmailReceiveLink
>

export default function AuthEmailReceiveSignInLinkScreen({ route }: Props) {
    const { params } = route
    useAuthEmailReceiveSignInLinkMountEffect({ params })

    return null
}
