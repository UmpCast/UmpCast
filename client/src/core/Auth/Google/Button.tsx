import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'

import SignInButton from '@/core/Auth/SignIn/Solid'

import useAuthGoogleSignIn from './useSignIn'

export default function GoogleButton() {
    const { prepared, signIn } = useAuthGoogleSignIn()
    return (
        <SignInButton disabled={!prepared} onPress={signIn}>
            <HStack alignItems="center" space={2}>
                <Icon as={AntDesign} name="google" size={5} />
                <Text bold fontSize="lg">
                    Continue with Google
                </Text>
            </HStack>
        </SignInButton>
    )
}
