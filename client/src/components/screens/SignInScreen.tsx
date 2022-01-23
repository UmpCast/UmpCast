import { Text, Heading, VStack } from 'native-base'

import ScreenWrapper from '../helper/ScreenWrapper'
import SignInEmailForm from '../core/SignInEmailForm'
import { RootStackParamList, RootStackRoutes } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import SignInGoogleButton from '../core/SocialAuth/GoogleButton'
import FBButton from '../core/SocialAuth/FBButton'

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
                <SignInEmailForm
                    onSuccess={(input) =>
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