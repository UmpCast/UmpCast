import { Box, Pressable, Text } from 'native-base'

import useSignOut from '@/hooks/auth/useSignOut'

export default function UserRegistrationCancelLink() {
    const signOut = useSignOut()

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
