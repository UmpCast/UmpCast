import DividedList from '@/components/DividedList'
import ScreenContainer from '@/components/ScreenContainer'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { useScreenQuery } from './index.generated'
import { Text } from 'native-base'
import Navigable from '@/components/Navigable'
import ActionButton from '@/components/ActionButton'

type Props = RootStackScreenProps<RootStackRoute.OrgSeasons>

export default function OrgSeasonsScreen({ route, navigation }: Props) {
    const { params } = route
    const { navigate } = navigation
    const { orgId } = params
    const [{ data: screenData }] = useScreenQuery({
        variables: {
            orgId
        }
    })

    if (!screenData) {
        return null
    }

    const { organization: org } = screenData

    const onCreatePress = () => {
        navigate(RootStackRoute.CreateSeason, {
            orgId
        })
    }

    const onSeasonPress = (seasonId: string) => {
        navigate(RootStackRoute.Season, {
            seasonId
        })
    }

    return (
        <ScreenContainer
            title="Seasons"
            headerRight={
                org.viewerCanManage && <ActionButton onPress={onCreatePress}>Create</ActionButton>
            }
        >
            <DividedList.Group>
                {org.seasons.map((season) => {
                    return (
                        <DividedList.Item key={season.id} onPress={() => onSeasonPress(season.id)}>
                            <Navigable>
                                <Text>{season.name}</Text>
                            </Navigable>
                        </DividedList.Item>
                    )
                })}
            </DividedList.Group>
        </ScreenContainer>
    )
}
