type Props = {}
import { SeasonRoleType, useSeasonParticipantProfileScreenQuery, useSeasonRoleQuery } from '../../../generated';

export default function SeasonParticipantProfileScreen({route}: Props) {
    const {params} = route
    const {seasonId, userId} = params

    const [roleResp] = useSeasonRoleQuery({
        variables: {
            seasonI
        }
    })

    const [screenResp] = useSeasonParticipantProfileScreenQuery({
        variables: {
            seasonId,
            userId,
            includeSensitive: false
        },
        pause: 
    })

    const season = screenResp.data?.season

    if (!season) return null

    season.participant.node.state
    
    return <div>SeasonParticipantProfileScreen</div>
}
