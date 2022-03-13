import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'
import useFacebook from './AuthFacebookuseFacebook'
import SignInButton from './AuthSignInSolid'

export default function FacebookButton() {
    const { prepared, signIn } = useFacebook()

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
