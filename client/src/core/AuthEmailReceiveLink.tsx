import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList, RootStackRoutes } from './AppRootStack'
import useAuthEmailReceiveLink from './AuthEmailuseReceiveLink'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.AuthEmailReceiveLink
>

export default function AuthEmailReceiveEntry({ route }: Props) {
    const { params } = route
    useAuthEmailReceiveLink({ params })

    return null
}
