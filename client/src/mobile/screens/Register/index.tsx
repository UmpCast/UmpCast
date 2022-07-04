import { Box, Heading, Pressable, VStack, Text } from 'native-base'

import useAuthLogout from '@/features/Auth/core/Logout/use'
import UserRegisterForm from '@/features/User/core/Register/Form'

export default function UserRegisterScreen() {
    const signOut = useAuthLogout()
    return (
        <VStack p={4}>
            <Heading textAlign="center">Register</Heading>
            <VStack space={4}>
                <UserRegisterForm />
                <Box alignItems="flex-start">
                    <Pressable onPress={signOut}>
                        <Text underline>Cancel Registration</Text>
                    </Pressable>
                </Box>
            </VStack>
        </VStack>
    )
}
