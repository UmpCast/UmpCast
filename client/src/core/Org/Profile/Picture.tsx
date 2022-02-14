import { OrgProfilePictureFragment } from '@/generated'
import { Box, Text } from 'native-base'
import { Image } from 'react-native'

export interface OrgProfilePictureProps {
    org: OrgProfilePictureFragment
}

export default function OrgProfilePicture({ org }: OrgProfilePictureProps) {
    return org.profilePicture ? (
        <Image
            style={{
                width: 50,
                height: 50
            }}
            source={{ uri: org.profilePicture }}
        />
    ) : (
        <Box
            borderWidth={1}
            width={50}
            height={50}
            alignItems="center"
            justifyContent="center"
        >
            <Text>{org.title[0]}</Text>
        </Box>
    )
}
