import { NavigationProp, useNavigation } from '@react-navigation/native'
import { VStack, Heading, Text } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'

import AuthEmailForm from '../Email/Form'
import FacebookButton from '../Facebook/Button'
import GoogleButton from '../Google/Button'

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.AuthSignIn
>

export default function AuthSignInScreen() {
    const navigation = useNavigation<ScreenNavigationProp>()

    return (
        <VStack p={4} space={4} justifyContent="center" flex={1}>
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
