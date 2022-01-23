import useSignOut from '@/hooks/useSignOut'
import { Box, Pressable, Text } from 'native-base'

export default function CancelLink() {
    const signOut = useSignOut()

    return (
        <Box alignItems="flex-start">
            <Pressable onPress={signOut}>
                <Text
                    color="primary.2"
                    //@ts-ignore
                    _hover={{ color: 'primary.3' }}
                    underline
                >
                    Cancel Registration
                </Text>
            </Pressable>
        </Box>
    )
}
