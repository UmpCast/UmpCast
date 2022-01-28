import { RootStackParamList, RootStackRoutes } from '@/navigation'
import { VStack, Heading, Text } from 'native-base'
import AuthEmailForm from '../Email/Form'
import FacebookButton from '../Facebook/Button'
import GoogleButton from '../Google/Button'
import { NavigationProp, useNavigation } from '@react-navigation/native'

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.SignIn
>

export default function AuthSignInScreen() {
    const navigation = useNavigation<ScreenNavigationProp>()

    return (
        <VStack p={4} space={4}>
            <Heading textAlign="center">Sign In / Sign Up</Heading>
            <GoogleButton />
            <FacebookButton />
            <Text textAlign="center">OR</Text>
            <AuthEmailForm
                onSend={(input) =>
                    navigation.navigate({
                        name: RootStackRoutes.SignInEmailSent,
                        params: {
                            email: input.email
                        }
                    })
                }
            />
        </VStack>
    )
}
