import { RouteProp, useRoute } from '@react-navigation/native'
import { VStack } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import {
    OrganizationRoleType,
    useSeasonParticipantListScreenQuery
} from '@/generated'

import SeasonParticipantRemoveButton from '../Remove/Button'
import { useSeasonParticipantOrgRole } from '../useOrgRole'

import SeasonParticipantListItem from './Item'

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SeasonParticipants
>

export default function SeasonParticipantListScreen() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useSeasonParticipantListScreenQuery({
        variables: {
            seasonId: params.seasonId
        }
    })

    const role = useSeasonParticipantOrgRole(data)

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
