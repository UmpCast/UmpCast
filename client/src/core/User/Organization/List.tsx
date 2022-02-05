import PressableItem from '@/components/Pressable/Item'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, Heading, HStack, Icon, VStack, Text } from 'native-base'

export default function UserOrganizationList() {
    return (
        <VStack space={4}>
            <Heading size="xs" color="indigo.500">
                MEMBER
            </Heading>

            <Heading size="xs" color="indigo.500">
                OWNER
            </Heading>
        </VStack>
    )
}
