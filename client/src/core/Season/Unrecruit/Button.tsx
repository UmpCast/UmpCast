import {
    SeasonUnrecruitButton_SeasonFragment,
    SeasonUnrecruitButton_UserFragment
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
    return (
        <Button variant="ghost" colorScheme="indigo">
            Remove
        </Button>
    )
}
