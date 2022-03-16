import useAuthSignInGoogle from '@/core/Auth/SignIn/useAuthSignInGoogle'
import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'

import AuthSignInButton from './AuthSignInButton'

export default function GoogleButton() {
    const { prepared, signIn } = useAuthSignInGoogle()
    return (
        <AuthSignInButton disabled={!prepared} onPress={signIn}>
            <HStack alignItems="center" space={2}>
                <Icon as={AntDesign} name="google" size={5} />
                <Text bold fontSize="lg">
                    Continue with Google
                </Text>
            </HStack>
        </AuthSignInButton>
    )
}
