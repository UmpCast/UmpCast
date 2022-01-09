import useSignInWithGoogle from '@/hooks/useSignInWithGoogle'
import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'

import GenericButton from './GenericButton'

export default function SignInWithGoogleButton() {
    const { prepared, login } = useSignInWithGoogle()
    return (
        <GenericButton disabled={!prepared} onPress={login}>
            <HStack alignItems="center" space={2}>
                <Icon as={AntDesign} name="google" size={5} />
                <Text fontSize="lg" bold>
                    Continue with Google
                </Text>
            </HStack>
        </GenericButton>
    )
}
