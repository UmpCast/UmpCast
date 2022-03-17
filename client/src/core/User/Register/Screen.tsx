import useAuthSignOut from '@/core/App/SignOut/use'
import { Box, Heading, Pressable, VStack, Text } from 'native-base'

import UserRegisterForm from './Form'

export default function UserRegisterScreen() {
    const signOut = useAuthSignOut()
    return (
        <VStack p={4}>
            <Heading textAlign="center">Register</Heading>
            <VStack space={4}>
                <UserRegisterForm />
                <Box alignItems="flex-start">
                    <Pressable onPress={signOut}>
                        <Text color="primary.2" underline>
                            Cancel Registration
                        </Text>
                    </Pressable>
                </Box>
            </VStack>
        </VStack>
    )
}
