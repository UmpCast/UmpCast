import { Box, Text } from 'native-base'
import { Image } from 'react-native'

import { OrgLogo_OrganizationFragment } from '@/generated'

export interface OrgInfoLogoProps {
    org: OrgLogo_OrganizationFragment
}

export default function OrgInfoLogo({ org }: OrgInfoLogoProps) {
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
            minWidth={50}
        >
            <Text bold color="white" fontSize="lg">
                {org.name[0].toUpperCase()}
            </Text>
        </Box>
    )
}
