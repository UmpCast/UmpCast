import { Box, Text } from 'native-base'
import { Image } from 'react-native'

import { OrgLogo_OrganizationFragment } from '@/generated'

export interface OrgLogoProps {
    org: OrgLogo_OrganizationFragment
}

export default function OrgLogo({ org }: OrgLogoProps) {
    return org.logoUrl ? (
        <Image
            source={{ uri: org.logoUrl }}
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
                {org.title[0].toUpperCase()}
            </Text>
        </Box>
    )
}
