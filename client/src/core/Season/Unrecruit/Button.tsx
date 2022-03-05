import {
    SeasonUnrecruitButton_SeasonFragment,
    SeasonUnrecruitButton_UserFragment,
    useUnrecruitFromSeasonMutation
} from '@/generated'
import { Button } from 'native-base'

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
        <Button variant="ghost" colorScheme="indigo" onPress={handlePress}>
            Remove
        </Button>
    )
}
