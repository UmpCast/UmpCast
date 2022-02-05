import PressableItem from '@/components/Pressable/Item'
import { Box, HStack, Text } from 'native-base'

export interface OrganizationItemProps {
    content: JSX.Element
    title: string
}

export function OrganizationListItem({
    content,
    title
}: OrganizationItemProps) {
    return (
        <PressableItem>
            <HStack alignItems="center" space={3}>
                <Box
                    h="25px"
                    justifyContent="center"
                    alignItems="center"
                    w="25px"
                >
                    {content}
                </Box>
                <Text fontSize="xs" color="blueGray.600" fontWeight="medium">
                    {title}
                </Text>
            </HStack>
        </PressableItem>
    )
}
