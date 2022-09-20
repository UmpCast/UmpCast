import { Button, HStack, Text } from 'native-base'

import UserAvatar from '@/features/User/Avatar'
import { OrgMemberItem_UserFragment } from '@/graphql/generated'
import { capitalize } from '@/utils/primitive'

export interface OrgMemberItemProp {
    user: OrgMemberItem_UserFragment
}

export default function OrgMemberItem({ user }: OrgMemberItemProp) {
    const { firstName, lastName } = user
    const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`

    return (
        <Button colorScheme="blueGray" justifyContent="flex-start" variant="ghost">
            <HStack alignItems="center" space={4}>
                <UserAvatar button={30} user={user} />
                <Text fontWeight="medium">{fullName}</Text>
            </HStack>
        </Button>
    )
}
