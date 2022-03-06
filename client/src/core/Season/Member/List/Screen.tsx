import { RouteProp, useRoute } from '@react-navigation/native'
import { VStack } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { useSeasonMemberListScreenQuery } from '@/generated'

import SeasonMemberRemoveButton from '../Remove/Button'

import SeasonMemberListItem from './Item'

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SeasonMembers
>

export default function SeasonMemberListScreen() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useSeasonMemberListScreenQuery({
        variables: {
            seasonId: params.id
        }
    })

    if (!data?.season) return null

    const { season } = data
    const { members, viewerCanRemoveMember } = season

    return (
        <ScreenContainer>
            <VStack>
                {members.map(
                    (permit) =>
                        permit && (
                            <SeasonMemberListItem
                                key={permit.id}
                                permit={permit}
                            >
                                {viewerCanRemoveMember && (
                                    <SeasonMemberRemoveButton
                                        season={season}
                                        user={permit.user}
                                    />
                                )}
                            </SeasonMemberListItem>
                        )
                )}
            </VStack>
        </ScreenContainer>
    )
}
