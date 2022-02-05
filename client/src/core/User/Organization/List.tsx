import PressableItem from '@/components/Pressable/Item'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, Heading, HStack, Icon, VStack, Text } from 'native-base'

export default function UserOrganizationList() {
    return (
        <VStack space={4}>
            <Heading size="xs" color="indigo.500">
                MEMBER
            </Heading>
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
            <Heading size="xs" color="indigo.500">
                OWNER
            </Heading>
        </VStack>
    )
}
