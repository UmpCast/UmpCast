import { Box, Text } from 'native-base'
import { Image } from 'react-native'

import { UserProfilePicture_UserFragment } from '@/generated'

export interface UserProfilePictureProps {
    user: UserProfilePicture_UserFragment
    size?: number
    borderRadius?: number
}

export default function UserProfilePicture({
    user,
    size = 30,
    borderRadius = 30
}: UserProfilePictureProps) {
    return user.profilePictureUrl ? (
        <Image
            source={{ uri: user.profilePictureUrl }}
            style={{
                width: size,
                height: size,
                borderRadius
            }}
        />
    ) : (
        <Box
            alignItems="center"
            bgColor="blueGray.300"
            borderRadius={borderRadius}
            height={size}
            justifyContent="center"
            width={size}
        >
            <Text bold color="white" fontSize="lg">
                {user.firstName[0].toUpperCase()}
            </Text>
        </Box>
    )
}
