import { RouteProp, useRoute } from '@react-navigation/native'
import { VStack } from 'native-base'

import {
    useSeasonParticipantListScreenQuery,
    OrganizationRoleType
} from '@/generated'
import SeasonParticipantListItem from './Item'
import ScreenContainer from '@/components/Screen/Container'
import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import useSeasonViewerOrgRole from '@/core/Season/useViewerOrgRole'
import SeasonParticipantRemoveButton from '../Remove/Button'

type ScreenRouteProp = RouteProp<
    AppRootStackParamList,
    AppRootStackRoute.SeasonParticipants
>

export default function SeasonParticipantListScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenRouteProp>()

    const [{ data }] = useSeasonParticipantListScreenQuery({
        variables: {
            seasonId
        }
    })

    const role = useSeasonViewerOrgRole({
        seasonId
    })

    if (!data?.season) return null

    const { season } = data
    const { participants } = season

    return (
        <ScreenContainer>
            <VStack>
                {participants.map((participant) => {
                    const { node: user } = participant

                    return (
                        <SeasonParticipantListItem
                            key={user.id}
                            participant={participant}
                        >
                            {role === OrganizationRoleType.Owner && (
                                <SeasonParticipantRemoveButton
                                    season={season}
                                    user={user}
                                />
                            )}
                        </SeasonParticipantListItem>
                    )
                })}
            </VStack>
        </ScreenContainer>
    )
}
