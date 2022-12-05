import { VStack } from 'native-base'

import ActionButton from '@/components/ActionButton'
import ScreenContainer from '@/components/ScreenContainer'
import Subheader from '@/components/Subheader'
import { NavRoute } from '@/mobile/navigation/routes'
import { TabsStackScreenProps } from '@/mobile/navigation/types'
import { SeasonParticipantRoleType } from '@/mock/schema.generated'

import UserItem from '../../../features/UserItem/index'

import { useScreenQuery } from './index.generated'

type Props = TabsStackScreenProps<NavRoute.SeasonParticipants>

export default function SeasonParticipantsScreen({ navigation, route }: Props) {
    const { params } = route
    const { navigate } = navigation
    const { seasonId } = params

    const [{ data: screenData }] = useScreenQuery({
        variables: {
            seasonId
        }
    })

    if (!screenData) {
        return null
    }

    const { season } = screenData

    const managers = season.participants.filter(
        (participant) =>
            participant.permit.role === SeasonParticipantRoleType.Manager
    )
    const referees = season.participants.filter(
        (participant) =>
            participant.permit.role === SeasonParticipantRoleType.Referee
    )

    const onAddPress = () => {
        navigate(NavRoute.AddSeasonParticipants, {
            seasonId
        })
    }

    const onParticipantPress = (userId: string) => {
        navigate(NavRoute.SeasonParticipantProfile, {
            seasonId,
            userId
        })
    }

    return (
        <ScreenContainer
            headerRight={
                season.viewerCanManage && (
                    <ActionButton onPress={onAddPress}>Add</ActionButton>
                )
            }
            title="Participants"
        >
            <VStack space="sm">
                {managers.length > 0 && (
                    <VStack space="2xs">
                        <Subheader>Managers</Subheader>
                        {managers.map((owner) => {
                            const { user } = owner
                            return (
                                <UserItem
                                    key={user.id}
                                    user={user}
                                    onPress={() => onParticipantPress(user.id)}
                                />
                            )
                        })}
                    </VStack>
                )}
                {referees.length > 0 && (
                    <VStack space="2xs">
                        <Subheader>Referees</Subheader>
                        {referees.map((member) => {
                            const { user } = member
                            return (
                                <UserItem
                                    key={user.id}
                                    user={user}
                                    onPress={() => onParticipantPress(user.id)}
                                />
                            )
                        })}
                    </VStack>
                )}
            </VStack>
        </ScreenContainer>
    )
}
