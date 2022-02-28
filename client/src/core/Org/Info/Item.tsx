import { AntDesign } from '@expo/vector-icons'
import {
    Icon,
    Image,
    Box,
    HStack,
    IPressableProps,
    Text,
    Button,
    IButtonProps
} from 'native-base'

import { OrgInfoItemFragment } from '@/generated'

export interface OrgInfoItemLayoutProps extends IButtonProps {
    source: React.ReactNode
    title: string
}

export function OrgInfoItemLayout({
    source,
    title,
    ...rest
}: OrgInfoItemLayoutProps) {
    return (
        <Button
            {...rest}
            variant="outline"
            colorScheme="blueGray"
            justifyContent="flex-start"
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
                    {title}
                </Text>
            </HStack>
        </Button>
    )
}

export interface OrgInfoItemProps {
    org: OrgInfoItemFragment
    onPress: () => void
}

export default function OrgInfoItem({ org, onPress }: OrgInfoItemProps) {
    const { title, logoUrl } = org

    return (
        <OrgInfoItemLayout
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
            title={title || 'N/A'}
        />
    )
}
