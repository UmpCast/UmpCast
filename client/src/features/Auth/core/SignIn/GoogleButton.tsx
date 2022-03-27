import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'

import AuthLoginButton from './Button'
import useAuthLoginGoogle from './useGoogle'

export default function GoogleButton() {
    const { prepared, Login } = useAuthLoginGoogle()
    return (
        <AuthLoginButton disabled={!prepared} onPress={Login}>
            <HStack alignItems="center" space={2}>
                <Icon as={AntDesign} name="google" size={5} />
                <Text bold fontSize="lg">
                    Continue with Google
                </Text>
            </HStack>
        </AuthLoginButton>
    )
}
