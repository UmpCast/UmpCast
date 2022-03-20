import { AntDesign } from '@expo/vector-icons'
import { HStack, Icon, Text, Pressable } from 'native-base'

export interface SeasonAboutViewerRoleItemProps {
    onPress: () => any
    name: string
}

export default function SeasonAboutViewerRoleItem({
    onPress,
    name
}: SeasonAboutViewerRoleItemProps) {
    return (
        <Pressable
            _hover={{ backgroundColor: 'blueGray.200' }}
            _pressed={{ backgroundColor: 'blueGray.300' }}
            borderRadius={5}
            onPress={onPress}
            px={4}
            py={3}
        >
            <HStack alignItems="center" justifyContent="space-between">
                <Text fontSize="md" fontWeight="medium">
                    {name}
                </Text>
                <Icon as={AntDesign} color="indigo.500" name="right" size={4} />
            </HStack>
        </Pressable>
    )
}
