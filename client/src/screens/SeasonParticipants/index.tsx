import { useRoute } from '@react-navigation/native'
import { VStack } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import useSeasonViewerOrgRole from '@/features/Season/hooks/useOrgRole'
import {
    useSeasonParticipantsScreenQuery,
    OrganizationRoleType
} from '@/generated'

import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import SeasonParticipantListItem from '@/features/SeasonParticipant/core/List/Item'
import SeasonParticipantRemoveButton from '@/features/SeasonParticipant/core/Remove/Button'

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
