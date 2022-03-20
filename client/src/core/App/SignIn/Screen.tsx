import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import AuthEmailForm from '@/core/AuthEmail/SendSignInLink/Form'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { VStack, Heading, Text } from 'native-base'
import FacebookButton from './FacebookButton'
import GoogleButton from './GoogleButton'

type ScreenNavigationProp = NavigationProp<
    AppRootStackParamList,
    AppRootStackRoute.AuthSignIn
>

export default function AuthSignInScreen() {
    const navigation = useNavigation<ScreenNavigationProp>()

    return (
        <VStack flex={1} justifyContent="center" p={4} space={4}>
            <Heading textAlign="center">Sign In / Sign Up</Heading>
            <GoogleButton />
            <FacebookButton />
            <Text textAlign="center">OR</Text>
            <AuthEmailForm
                onSend={(input) =>
                    navigation.navigate({
                        name: AppRootStackRoute.AuthEmailSent,
                        params: {
                            email: input.email
                        }
                    })
                }
            />
        </VStack>
    )
}
