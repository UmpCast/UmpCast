import { useRoute } from '@react-navigation/native'
import { VStack } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import useSeasonViewerOrgRole from '@/features/Season/hooks/useOrgRole'
import SeasonParticipantListItem from '@/features/SeasonParticipant/core/List/Item'
import SeasonParticipantRemoveButton from '@/features/SeasonParticipant/core/Remove/Button'
import {
    useSeasonParticipantsScreenQuery,
    OrganizationRoleType
} from '@/graphql/generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

type ScreenProps = RootStackScreenProps<RootStackRoute.SeasonParticipants>

export default function SeasonParticipantsScreen() {
    const {
        params: { seasonId }
    } = useRoute<ScreenProps['route']>()

    const [{ data }] = useSeasonParticipantsScreenQuery({
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