import FacebookButton from '@/features/Auth/core/SignIn/FacebookButton'
import GoogleButton from '@/features/Auth/core/SignIn/GoogleButton'
import AuthEmailForm from '@/features/AuthEmail/core/SendSignInLink/Form'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import { useNavigation } from '@react-navigation/native'
import { VStack, Heading, Text } from 'native-base'

type ScreenProps = RootStackScreenProps<RootStackRoute.Signin>

export default function SignInScreen() {
    const navigation = useNavigation<ScreenProps['navigation']>()

    return (
        <VStack flex={1} justifyContent="center" p={4} space={4}>
            <Heading textAlign="center">Sign In / Sign Up</Heading>
            <GoogleButton />
            <FacebookButton />
            <Text textAlign="center">OR</Text>
            <AuthEmailForm
                onSend={(input) =>
                    navigation.navigate({
                        name: RootStackRoute.SigninLinkSent,
                        params: {
                            email: input.email
                        }
                    })
                }
            />
        </VStack>
    )
}
