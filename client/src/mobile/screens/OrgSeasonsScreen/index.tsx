import { HStack, Text, VStack } from 'native-base'

import DividedList from '@/components/DividedList'
import ScreenContainer from '@/components/ScreenContainer'
import OrgLogo from '@/features/OrgLogo'
import { NavRoute } from '@/mobile/navigation/routes'
import { TabsStackScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'
import NxIconButton from '@/components/IconButton'
import MaterialIcon from '@/components/MaterialIcon'

type Props = TabsStackScreenProps<NavRoute.OrgSeasons>

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
        navigate(NavRoute.CreateSeason, {
            orgId
        })
    }

    const onSeasonPress = (seasonId: string) => {
        navigate(NavRoute.Season, {
            seasonId
        })
    }

    return (
        <ScreenContainer
            title="Seasons"
            headerRight={
                org.viewerCanManage && (
                    <NxIconButton
                        variant="primary.ghost"
                        onPress={onCreatePress}
                    >
                        <MaterialIcon
                            name="plus"
                            color="primary.solid"
                            size="lg"
                        />
                    </NxIconButton>
                )
            }
        >
            <VStack space="sm">
                <DividedList.Group>
                    {org.seasons.map((season) => {
                        return (
                            <DividedList.Item
                                key={season.id}
                                onPress={() => onSeasonPress(season.id)}
                            >
                                <VStack space="xs">
                                    <HStack alignItems="center" space="xs">
                                        <OrgLogo org={org} size="20px" />
                                        <Text
                                            color="secondary.500"
                                            fontSize="sm"
                                            fontWeight="semibold"
                                        >
                                            {org.name}
                                        </Text>
                                    </HStack>
                                    <Text fontWeight="semibold">
                                        {season.name}
                                    </Text>
                                </VStack>
                            </DividedList.Item>
                        )
                    })}
                </DividedList.Group>
            </VStack>
        </ScreenContainer>
    )
}
