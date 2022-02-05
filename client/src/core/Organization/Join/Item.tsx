import PressableItem from '@/components/Pressable/Item'
import { Ionicons } from '@expo/vector-icons'
import { HStack, Icon, Text } from 'native-base'

export default function OrganizationJoinItem() {
    return (
        <PressableItem>
            <HStack space={3} justifyContent="left" alignItems="center">
                <Icon
                    size="20px"
                    as={Ionicons}
                    name="information-circle-outline"
                    color="indigo.500"
                />
                <Text fontSize="xs" color="blueGray.600">
                    Join an Organization
                </Text>
            </HStack>
        </PressableItem>
    )
}
