import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import ScreenContainer from '@/core/Components/Screen/Container'
import {
    OrganizationPermissionLevel,
    useSeasonMemberScreenQuery
} from '@/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { VStack } from 'native-base'
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
                            <SeasonMemberItem permit={permit} key={permit.id}>
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
