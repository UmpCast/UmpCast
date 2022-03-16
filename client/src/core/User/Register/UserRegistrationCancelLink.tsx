import { Box, Pressable, Text } from 'native-base'

import useAuthSignOut from '@/core/Auth/SignOut/use'

export default function UserRegistrationCancelLink() {
    const signOut = useAuthSignOut()

    return (
        <Box alignItems="flex-start">
            <Pressable onPress={signOut}>
                <Text color="primary.2" underline>
                    Cancel Registration
                </Text>
            </Pressable>
        </Box>
    )
}
