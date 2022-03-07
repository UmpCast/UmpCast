import { Button } from 'native-base'

import {
    SeasonMemberRemoveButton_SeasonFragment,
    SeasonMemberRemoveButton_UserFragment,
    useRemoveSeasonMemberMutation
} from '@/generated'

export interface SeasonMemberRemoveButtonProps {
    season: SeasonMemberRemoveButton_SeasonFragment
    user: SeasonMemberRemoveButton_UserFragment
}

export default function SeasonMemberRemoveButton({
    season,
    user
}: SeasonMemberRemoveButtonProps) {
    const [_, removeMember] = useRemoveSeasonMemberMutation()

    const handlePress = async () => {
        await removeMember({
            input: {
                seasonId: season.id,
                userId: user.id
            }
        })
    }

    return (
        <Button
            colorScheme="indigo"
            onPress={handlePress}
            size="sm"
            variant="ghost"
        >
            Remove
        </Button>
    )
}
