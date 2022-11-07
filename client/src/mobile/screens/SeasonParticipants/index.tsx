import { VStack } from 'native-base'

import ActionButton from '@/components/ActionButton'
import ScreenContainer from '@/components/ScreenContainer'
import Subheader from '@/components/Subheader'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { SeasonParticipantRoleType } from '@/mock/schema.generated'

import UserItem from '../../../features/UserItem/index'

import { useScreenQuery } from './index.generated'

type Props = RootStackScreenProps<RootStackRoute.SeasonParticipants>

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
        navigate(RootStackRoute.AddSeasonParticipants, {
            seasonId
        })
    }

    return (
        <ScreenContainer
            headerRight={
                season.viewerCanManage && (
                    <ActionButton onPress={onAddPress}>Add</ActionButton>
                )
            }
            title="Members"
        >
            <VStack space="sm">
                {managers.length > 0 && (
                    <VStack space="2xs">
                        <Subheader>Managers</Subheader>
                        {managers.map((owner) => {
                            const { user } = owner
                            return <UserItem key={user.id} user={user} />
                        })}
                    </VStack>
                )}
                {referees.length > 0 && (
                    <VStack space="2xs">
                        <Subheader>Referees</Subheader>
                        {referees.map((member) => {
                            const { user } = member
                            return <UserItem key={user.id} user={user} />
                        })}
                    </VStack>
                )}
            </VStack>
        </ScreenContainer>
    )
}
