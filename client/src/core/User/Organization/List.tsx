import { UserOrganizationItem } from '@/core/User/Organization/Item'
import { AntDesign } from '@expo/vector-icons'
import { Heading, Icon, VStack } from 'native-base'

export default function UserOrganizationList() {
    const { data } = useGetUserOrganizationListQuery

    return (
        <VStack space={4}>
            <Heading size="xs" color="indigo.500">
                MEMBER
            </Heading>
            <UserOrganizationItem
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
