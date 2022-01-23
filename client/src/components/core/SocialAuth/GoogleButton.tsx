import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'

import SignInButton from '@/components/helper/SignInButton'
import useSignInWithGoogle from '@/hooks/useSignInWithGoogle'

export default function GoogleButton() {
    const { prepared, signIn } = useSignInWithGoogle()
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
