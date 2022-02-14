import { Box, Text } from 'native-base'
import { Image } from 'react-native'

import { OrgProfilePictureFragment } from '@/generated'

export interface OrgProfilePictureProps {
    org: OrgProfilePictureFragment
}

export default function OrgProfilePicture({ org }: OrgProfilePictureProps) {
    return org.profilePicture ? (
        <Image
            source={{ uri: org.profilePicture }}
            style={{
                width: 50,
                height: 50,
                borderRadius: 5
            }}
        />
    ) : (
        <Box
            alignItems="center"
            bgColor="blueGray.300"
            borderRadius={5}
            height={50}
            justifyContent="center"
            width={50}
        >
            <Text bold color="white" fontSize="lg">
                {org.title[0]}
            </Text>
        </Box>
    )
}
