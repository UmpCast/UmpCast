import { SeasonMemberItem_UserSeasonPermitFragment } from '@/generated'
import { capitalize } from '@/utils/object'
import { Pressable, Text } from 'native-base'

export interface SeasonMemberItemProps {
    permit: SeasonMemberItem_UserSeasonPermitFragment
}

export default function SeasonMemberItem({ permit }: SeasonMemberItemProps) {
    const { user, permissionList } = permit

    const { firstName, lastName } = user
    const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`

    return (
        <Pressable
            _hover={{
                backgroundColor: 'blueGray.100'
            }}
            _pressed={{
                backgroundColor: 'blueGray.200'
            }}
            borderRadius={5}
            px={4}
            py={3}
        >
            <Text>{fullName}</Text>
        </Pressable>
    )
}
