import { ITextProps, Text } from 'native-base'

import { SeasonParticipantItemName_UserFragment } from '@/generated'
import { capitalize } from '@/utils/primitive'

export interface SeasonParticipantItemNameProps extends ITextProps {
    user: SeasonParticipantItemName_UserFragment
}

export default function SeasonParticipantItemName({
    user,
    ...rest
}: SeasonParticipantItemNameProps) {
    const { firstName, lastName } = user
    const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`

    return (
        <Text fontSize="md" fontWeight="medium" {...rest}>
            {fullName}
        </Text>
    )
}
