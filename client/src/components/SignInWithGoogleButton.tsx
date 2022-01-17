import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'

import useSignInWithGoogle from '@/hooks/useSignInWithGoogle'

import GenericButton from './GenericButton'

export default function SignInWithGoogleButton() {
    const { prepared, signIn } = useSignInWithGoogle()
    return (
        <GenericButton disabled={!prepared} onPress={signIn}>
            <HStack alignItems="center" space={2}>
                <Icon as={AntDesign} name="google" size={5} />
                <Text bold fontSize="lg">
                    Continue with Google
                </Text>
            </HStack>
        </GenericButton>
    )
}
