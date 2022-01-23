import { Box, Pressable, Text } from 'native-base'

import useSignOut from '@/hooks/useSignOut'

export default function CancelLink() {
    const signOut = useSignOut()

    return (
        <Box alignItems="flex-start">
            <Pressable onPress={signOut}>
                <Text
                    _hover={{ color: 'primary.3' }}
                    // @ts-ignore
                    color="primary.2"
                    underline
                >
                    Cancel Registration
                </Text>
            </Pressable>
        </Box>
    )
}
