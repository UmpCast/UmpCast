import { AntDesign } from '@expo/vector-icons'
import {
    Icon,
    Image,
    Box,
    HStack,
    IPressableProps,
    Pressable,
    Text
} from 'native-base'

import { OrgInfoItemFragment } from '@/generated'

export interface OrgInfoItemLayoutProps extends IPressableProps {
    source: JSX.Element
    title: string
}

export function OrgInfoItemLayout({
    source,
    title,
    ...rest
}: OrgInfoItemLayoutProps) {
    return (
        <Pressable
            {...rest}
            _hover={{ bgColor: 'blueGray.300' }}
            bgColor="blueGray.200"
            borderRadius={5}
            px={3}
            py={2}
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
        </Pressable>
    )
}

export interface OrgInfoItemProps {
    org: OrgInfoItemFragment
    onPress: () => void
}

export default function OrgInfoItem({ org, onPress }: OrgInfoItemProps) {
    const { title, profilePicture } = org

    return (
        <OrgInfoItemLayout
            onPress={onPress}
            source={
                profilePicture ? (
                    <Image
                        alt="organization-picture"
                        borderRadius="15px"
                        size="20px"
                        src={profilePicture}
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
