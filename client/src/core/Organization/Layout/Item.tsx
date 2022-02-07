import { Box, HStack, IPressableProps, Pressable, Text } from 'native-base'

export interface OrganizationLayoutItemProps extends IPressableProps {
    source: JSX.Element
    title: string
}

export default function OrganizationLayoutItem({
    source,
    title,
    ...rest
}: OrganizationLayoutItemProps) {
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
