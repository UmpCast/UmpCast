import { AntDesign } from '@expo/vector-icons'
import { Icon, HStack, Text } from 'native-base'

export function Facebook() {
    return (
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
    )
}

export function Google() {
    return (
        <HStack alignItems="center" space={2}>
            <Icon as={AntDesign} name="google" size={5} />
            <Text fontSize="lg" bold>
                Continue with Google
            </Text>
        </HStack>
    )
}
