import PressableItem, { PressableItemProps } from '@/components/Pressable/Item'
import { Box, HStack, Text } from 'native-base'

export interface PressableIconItemProps extends PressableItemProps {
    content: JSX.Element
    title: string
}

export function PressableIconItem({
    content,
    title,
    ...rest
}: PressableIconItemProps) {
    return (
        <PressableItem {...rest}>
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
