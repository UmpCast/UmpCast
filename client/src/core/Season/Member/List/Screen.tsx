import { RouteProp, useRoute } from '@react-navigation/native'
import { VStack } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import {
    OrganizationRoleType,
    useSeasonMemberListScreenQuery
} from '@/generated'

import SeasonMemberRemoveButton from '../Remove/Button'
import { useSeasonMemberOrgRole } from '../useOrgRole'

import SeasonMemberListItem from './Item'

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SeasonMembers
>

export default function SeasonMemberListScreen() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useSeasonMemberListScreenQuery({
        variables: {
            seasonId: params.seasonId
        }
    })

    const role = useSeasonMemberOrgRole(data)

    if (!data?.season) return null

    const { season } = data
    const { participants } = season

    return (
        <ScreenContainer>
            <VStack>
                {participants.map((participant) => {
                    const { node: user } = participant

                    return (
                        <SeasonMemberListItem
                            key={user.id}
                            participant={participant}
                        >
                            {role === OrganizationRoleType.Owner && (
                                <SeasonMemberRemoveButton
                                    season={season}
                                    user={user}
                                />
                            )}
                        </SeasonMemberListItem>
                    )
                })}
            </VStack>
        </ScreenContainer>
    )
}
