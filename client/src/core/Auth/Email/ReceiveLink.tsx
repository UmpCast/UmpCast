import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'

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
