import { Button } from 'native-base'

import {
    SeasonUnrecruitButton_SeasonFragment,
    SeasonUnrecruitButton_UserFragment,
    useUnrecruitFromSeasonMutation
} from '@/generated'

export interface SeasonUnrecruitButtonProps {
    season: SeasonUnrecruitButton_SeasonFragment
    user: SeasonUnrecruitButton_UserFragment
}

export default function SeasonUnrecruitButton({
    season,
    user
}: SeasonUnrecruitButtonProps) {
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
