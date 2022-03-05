import { RouteProp, useRoute } from '@react-navigation/native'
import { VStack } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import {
    OrganizationPermissionLevel,
    useSeasonMemberScreenQuery
} from '@/generated'

import SeasonUnrecruitButton from '../Unrecruit/Button'

import SeasonMemberItem from './Item'

type ScreenRouteProp = RouteProp<
    RootStackParamList,
    RootStackRoutes.SeasonMembers
>

export default function SeasonMemberScreen() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useSeasonMemberScreenQuery({
        variables: {
            seasonId: params.id
        }
    })

    if (!data?.season) return null

    const { season } = data
    const { memberList, organization } = season

    const isOwner =
        organization.myPermit?.permissionLevel ===
        OrganizationPermissionLevel.Owner

    return (
        <ScreenContainer>
            <VStack>
                {memberList.map(
                    (permit) =>
                        permit && (
                            <SeasonMemberItem key={permit.id} permit={permit}>
                                {isOwner && (
                                    <SeasonUnrecruitButton
                                        season={season}
                                        user={permit.user}
                                    />
                                )}
                            </SeasonMemberItem>
                        )
                )}
            </VStack>
        </ScreenContainer>
    )
}
