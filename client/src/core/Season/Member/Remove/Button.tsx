import { Button } from 'native-base'

import {
    SeasonMemberRemoveButton_SeasonFragment,
    SeasonMemberRemoveButton_UserFragment,
    useUnrecruitFromSeasonMutation
} from '@/generated'

export interface SeasonMemberRemoveButtonProps {
    season: SeasonMemberRemoveButton_SeasonFragment
    user: SeasonMemberRemoveButton_UserFragment
}

export default function SeasonMemberRemoveButton({
    season,
    user
}: SeasonMemberRemoveButtonProps) {
    const [_, unrecruitFromSeason] = useUnrecruitFromSeasonMutation()

    const handlePress = async () => {
        await unrecruitFromSeason({
            input: {
                seasonId: season.id,
                userId: user.id
            }
        })
    }

    return (
        <Button colorScheme="indigo" onPress={handlePress} variant="ghost">
            Remove
        </Button>
    )
}
