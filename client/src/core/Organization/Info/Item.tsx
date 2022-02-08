import { OrgInfoItemFragment } from '@/generated'
import { AntDesign } from '@expo/vector-icons'
import { Icon, Image } from 'native-base'
import { Box, HStack, IPressableProps, Pressable, Text } from 'native-base'

export interface OrgInfoItemTemplateProps extends IPressableProps {
    source: JSX.Element
    title: string
}

export function OrgInfoItemTemplate({
    source,
    title,
    ...rest
}: OrgInfoItemTemplateProps) {
    return (
        <Pressable
            {...rest}
            bgColor="blueGray.200"
            _hover={{ bgColor: 'blueGray.300' }}
            py={2}
            px={3}
            borderRadius={5}
        >
            <HStack alignItems="center" space={3}>
                <Box
                    h="25px"
                    justifyContent="center"
                    alignItems="center"
                    w="25px"
                >
                    {source}
                </Box>
                <Text fontSize="xs" color="blueGray.600" fontWeight="medium">
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
        <OrgInfoItemTemplate
            onPress={onPress}
            title={title || 'N/A'}
            source={
                profilePicture ? (
                    <Image
                        src={profilePicture}
                        size="20px"
                        borderRadius="15px"
                        alt={'organization-picture'}
                    />
                ) : (
                    <Icon
                        as={AntDesign}
                        name="questioncircleo"
                        color="indigo.500"
                        size="20px"
                    />
                )
            }
        />
    )
}
