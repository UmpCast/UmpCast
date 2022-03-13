import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList, RootStackRoutes } from './AppRootStack'
import useAuthSignInReceiveEmailLink from '../hooks/useAuthSignInReceiveEmailLink'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.AuthEmailReceiveLink
>

export default function AuthEmailReceiveEntry({ route }: Props) {
    const { params } = route
    useAuthSignInReceiveEmailLink({ params })

    return null
}
