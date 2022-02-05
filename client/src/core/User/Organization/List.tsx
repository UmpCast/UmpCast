import { OrganizationListItem } from '@/core/Organization/List/Item'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { Pressable, Heading, HStack, Icon, VStack, Text } from 'native-base'

export default function UserOrganizationList() {
    return (
        <VStack space={4}>
            <Heading size="xs" color="indigo.500">
                MEMBER
            </Heading>
            <OrganizationListItem
                title="Palo Alto Little League"
                content={
                    <Icon
                        size="20px"
                        name="questioncircleo"
                        as={AntDesign}
                        color="indigo.500"
                    />
                }
            />

            <Heading size="xs" color="indigo.500">
                OWNER
            </Heading>
        </VStack>
    )
}
