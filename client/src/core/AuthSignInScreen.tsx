import { NavigationProp, useNavigation } from '@react-navigation/native'
import { VStack, Heading, Text } from 'native-base'
import { RootStackParamList, RootStackRoutes } from './AppRootStack'
import AuthEmailForm from './AuthEmailForm'
import FacebookButton from './AuthFacebookButton'
import GoogleButton from './AuthGoogleButton'

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.AuthSignIn
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
                        name: RootStackRoutes.AuthEmailSent,
                        params: {
                            email: input.email
                        }
                    })
                }
            />
        </VStack>
    )
}
