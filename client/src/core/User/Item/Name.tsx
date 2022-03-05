import { Text } from 'native-base'
import { capitalize } from '@/utils/object'
import { UserItemName_UserFragment } from '@/generated'

export interface UserItemNameProps {
    user: UserItemName_UserFragment
}

export default function UserItemName({ user }: UserItemNameProps) {
    const { firstName, lastName } = user
    const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`

    return (
        <Text fontSize="md" fontWeight="medium">
            {fullName}
        </Text>
    )
}
