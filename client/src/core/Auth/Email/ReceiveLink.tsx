import { RootStackParamList, RootStackRoutes } from '@/navigation'
import { StackScreenProps } from '@react-navigation/stack'
import useAuthEmailReceiveLink from './useReceiveLink'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.AuthEmailReceiveLink
>

export default function AuthEmailReceiveEntry({ route }: Props) {
    const { params } = route
    useAuthEmailReceiveLink({ params })

    return null
}
