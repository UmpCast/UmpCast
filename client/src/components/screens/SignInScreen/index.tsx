import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, Heading, VStack } from 'native-base'

import EmailForm from '@/components/core/EmailSignIn/EmailForm'
import { RootStackParamList, RootStackRoutes } from '@/navigation'

import FBButton from '../../core/SocialAuth/FBButton'
import SignInGoogleButton from '../../core/SocialAuth/GoogleButton'
import ScreenWrapper from '../../helper/ScreenWrapper'

type SignInNavigationProp = StackNavigationProp<
    RootStackParamList,
    RootStackRoutes.SignIn
>

export default function SignInScreen() {
    const navigation = useNavigation<SignInNavigationProp>()
    return (
        <ScreenWrapper>
            <VStack flex={1} space={4}>
                <Heading textAlign="center">Sign In / Sign Up</Heading>
                <SignInGoogleButton />
                <FBButton />
                <Text textAlign="center">OR</Text>
                <EmailForm
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
        </ScreenWrapper>
    )
}
