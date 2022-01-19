import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'

import useSignInWithFB from '@/hooks/useSignInWithFB'

import SignInButton from '../atoms/SignInButton'

export default function SignInFBButton() {
    const { prepared, signIn } = useSignInWithFB()

    return (
        <SignInButton disabled={!prepared} onPress={signIn}>
            <HStack alignItems="center" space={2}>
                <Icon
                    as={AntDesign}
                    color="blue.500"
                    name="facebook-square"
                    size={5}
                />
                <Text bold color="blue.500" fontSize="lg">
                    Continue with Facebook
                </Text>
            </HStack>
        </SignInButton>
    )
}
