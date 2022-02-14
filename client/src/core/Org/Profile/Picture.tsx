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
                height: 50,
                borderRadius: 5
            }}
            source={{ uri: org.profilePicture }}
        />
    ) : (
        <Box
            width={50}
            height={50}
            alignItems="center"
            justifyContent="center"
            borderRadius={5}
            bgColor="blueGray.300"
        >
            <Text color="white" fontSize="lg" bold>
                {org.title[0]}
            </Text>
        </Box>
    )
}
