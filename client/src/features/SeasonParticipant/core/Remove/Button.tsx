import { Button } from 'native-base'

import {
    SeasonParticipantRemoveButton_SeasonFragment,
    SeasonParticipantRemoveButton_UserFragment,
    useSeasonParticipantRemoveMutation
} from '@/graphql/generated'

export interface SeasonParticipantRemoveButtonProps {
    season: SeasonParticipantRemoveButton_SeasonFragment
    user: SeasonParticipantRemoveButton_UserFragment
}

export default function SeasonParticipantRemoveButton({
    season,
    user
}: SeasonParticipantRemoveButtonProps) {
    const [_, removeMember] = useSeasonParticipantRemoveMutation()

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
            button="sm"
            variant="ghost"
        >
            Remove
        </Button>
    )
}
