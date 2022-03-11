import { AntDesign } from '@expo/vector-icons'
import {
    Icon,
    Image,
    Box,
    HStack,
    Text,
    Button,
    IButtonProps
} from 'native-base'

import { OrgInfoItem_OrganizationFragment } from '@/generated'

export interface OrgInfoItemLayoutProps extends IButtonProps {
    source: React.ReactNode
    name: string
}

export function OrgInfoItemLayout({
    source,
    name,
    ...rest
}: OrgInfoItemLayoutProps) {
    return (
        <Button
            {...rest}
            colorScheme="blueGray"
            justifyContent="flex-start"
            variant="outline"
        >
            <HStack alignItems="center" space={3}>
                <Box
                    alignItems="center"
                    h="25px"
                    justifyContent="center"
                    w="25px"
                >
                    {source}
                </Box>
                <Text color="blueGray.600" fontSize="xs" fontWeight="medium">
                    {name}
                </Text>
            </HStack>
        </Button>
    )
}

export interface OrgInfoItemProps {
    org: OrgInfoItem_OrganizationFragment
    onPress: () => void
}

export default function OrgInfoItem({ org, onPress }: OrgInfoItemProps) {
    const { name, logoUrl } = org

    return (
        <OrgInfoItemLayout
            name={name}
            onPress={onPress}
            source={
                logoUrl ? (
                    <Image
                        alt="organization-picture"
                        borderRadius="15px"
                        size="20px"
                        src={logoUrl}
                    />
                ) : (
                    <Icon
                        as={AntDesign}
                        color="indigo.500"
                        name="questioncircleo"
                        size="20px"
                    />
                )
            }
        />
    )
}
