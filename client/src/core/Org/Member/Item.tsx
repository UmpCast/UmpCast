import UserProfilePicture from '@/core/User/Profile/Picture'
import { OrgMemberItem_UserFragment } from '@/generated'
import { capitalize } from '@/utils/object'
import { Box, Button, HStack, Text } from 'native-base'

export interface OrgMemberItemProp {
    user: OrgMemberItem_UserFragment
}

export default function OrgMemberItem({ user }: OrgMemberItemProp) {
    const { firstName, lastName } = user
    const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`

    return (
        <Button
            variant="ghost"
            colorScheme="blueGray"
            justifyContent="flex-start"
        >
            <HStack space={4} alignItems="center">
                <UserProfilePicture user={user} />
                <Text fontWeight="medium">{fullName}</Text>
            </HStack>
        </Button>
    )
}
