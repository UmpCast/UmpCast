import PressableItem from '@/components/Pressable/Item'
import OrganizationListItem from '@/core/Organization/List/Item'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, Heading, HStack, Icon, VStack, Text } from 'native-base'

export default function UserOrganizationList() {
    return (
        <VStack space={4}>
            <Heading size="xs" color="indigo.500">
                MEMBER
            </Heading>
            <OrganizationListItem title="Palo Alto Little League" />
            <Heading size="xs" color="indigo.500">
                OWNER
            </Heading>
        </VStack>
    )
}
