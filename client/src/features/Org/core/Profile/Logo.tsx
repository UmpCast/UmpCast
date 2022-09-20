import { Box, Text } from 'native-base'
import { Image } from 'react-native'

import { OrgProfileLogo_OrganizationFragment } from '@/graphql/generated'

export interface OrgProfileLogoProps {
    org: OrgProfileLogo_OrganizationFragment
    size?: number
}

export default function OrgProfileLogo({ org, size = 50 }: OrgProfileLogoProps) {
    return org.logoUrl ? (
        <Image
            source={{ uri: org.logoUrl }}
            style={{
                width: size,
                height: size,
                borderRadius: 5
            }}
        />
    ) : (
        <Box
            alignItems="center"
            bgColor="blueGray.300"
            borderRadius={5}
            height={size}
            justifyContent="center"
            minWidth={size}
        >
            <Text bold color="white" fontSize="lg">
                {org.name[0].toUpperCase()}
            </Text>
        </Box>
    )
}
