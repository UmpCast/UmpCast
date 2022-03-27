import FacebookButton from '@/features/Auth/core/Login/FacebookButton'
import GoogleButton from '@/features/Auth/core/Login/GoogleButton'
import AuthEmailForm from '@/features/AuthEmail/core/SendSignInLink/Form'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import { useNavigation } from '@react-navigation/native'
import { VStack, Heading, Text } from 'native-base'

type ScreenProps = RootStackScreenProps<RootStackRoute.Login>

export default function LoginScreen() {
    const navigation = useNavigation<ScreenProps['navigation']>()

    return (
        <VStack flex={1} justifyContent="center" p={4} space={4}>
            <Heading textAlign="center">Login</Heading>
            <GoogleButton />
            <FacebookButton />
            <Text textAlign="center">OR</Text>
            <AuthEmailForm
                onSend={(input) =>
                    navigation.navigate(RootStackRoute.LoginLinkSent, {
                        email: input.email
                    })
                }
            />
        </VStack>
    )
}
