import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'

import useSignInWithFB from '@/hooks/useSignInWithFB'

import GenericButton from './GenericButton'

export default function SignInWithFBButton() {
    const { prepared, signIn } = useSignInWithFB()

    return (
        <GenericButton disabled={!prepared} onPress={signIn}>
            <HStack alignItems="center" space={2}>
                <Icon
                    as={AntDesign}
                    name="facebook-square"
                    size={5}
                    color="blue.500"
                />
                <Text fontSize="lg" bold color="blue.500">
                    Continue with Facebook
                </Text>
            </HStack>
        </GenericButton>
    )
}
