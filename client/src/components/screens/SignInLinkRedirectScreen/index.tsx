import { StackScreenProps } from '@react-navigation/stack'

import LinkEntry from '@/components/core/EmailSignIn/LinkEntry'
import { RootStackParamList, RootStackRoutes } from '@/navigation'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.SignInLinkRedirect
>

export default function SignInLinkRedirectScreen({ route }: Props) {
    return <LinkEntry params={route.params} />
}
