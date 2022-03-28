import { Button, HStack, Text } from 'native-base'

import UserProfilePicture from '@/features/User/components/ProfilePicture'
import { OrgMemberItem_UserFragment } from '@/generated'
import { capitalize } from '@/utils/object'

export interface OrgMemberItemProp {
    user: OrgMemberItem_UserFragment
}

export default function OrgMemberItem({ user }: OrgMemberItemProp) {
    const { firstName, lastName } = user
    const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`

    return (
        <Button
            colorScheme="blueGray"
            justifyContent="flex-start"
            variant="ghost"
        >
            <HStack alignItems="center" space={4}>
                <UserProfilePicture size={30} user={user} />
                <Text fontWeight="medium">{fullName}</Text>
            </HStack>
        </Button>
    )
}
