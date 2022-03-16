import { ITextProps, Text } from 'native-base'

import { UserItemName_UserFragment } from '@/generated'
import { capitalize } from '@/utils/object'

export interface SeasonParticipantInfoItemNameProps extends ITextProps {
    user: UserItemName_UserFragment
}

export default function SeasonParticipantInfoItemName({
    user,
    ...rest
}: SeasonParticipantInfoItemNameProps) {
    const { firstName, lastName } = user
    const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`

    return (
        <Text fontSize="md" fontWeight="medium" {...rest}>
            {fullName}
        </Text>
    )
}
