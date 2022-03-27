import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'

import AuthLoginButton from './Button'
import useAuthLoginFacebook from './useFacebook'

export default function FacebookButton() {
    const { prepared, Login } = useAuthLoginFacebook()

    return (
        <AuthLoginButton disabled={!prepared} onPress={Login}>
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
        </AuthLoginButton>
    )
}
