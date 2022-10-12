import { isSameDay } from 'date-fns'
import { HStack, VStack, Text, Heading } from 'native-base'

import MaterialIcon from '@/components/MaterialIcon'
import ScreenContainer from '@/components/ScreenContainer'
import GameCalendar from '@/features/GameCalendar'
import { AppBottomTabRoute } from '@/mobile/navigation/navigators/BottomTab/types'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { AppBottomTabScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'
import OrgLogo from '@/features/OrgLogo'
import DividedList from '@/components/DividedList'

type Props = AppBottomTabScreenProps<AppBottomTabRoute.Home>

export default function HomeScreen({ navigation }: Props) {
    const { navigate } = navigation

    const [{ data }] = useScreenQuery()

    if (!data?.viewer) {
        return null
    }

    const { viewer } = data
    const { assignedListings, participatingSeasons } = viewer

    const onGamePress = (gameId: string) => {
        navigate(RootStackRoute.Game, {
            gameId
        })
    }

    const onSeasonPress = (seasonId: string) => {
        navigate(RootStackRoute.Season, {
            seasonId
        })
    }

    return (
        <ScreenContainer title="Home">
            <VStack space="md">
                <Heading size="md">Your Seasons</Heading>
                <DividedList.Group>
                    {participatingSeasons.map((participatingSeason) => {
                        const { season } = participatingSeason
                        const { organization: org } = season
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
                                    <Text fontWeight="semibold">{season.name}</Text>
                                </VStack>
                            </DividedList.Item>
                        )
                    })}
                </DividedList.Group>
                <Heading size="md">Upcoming Games</Heading>
                {assignedListings.map((viewerListing, i) => {
                    const { game } = viewerListing

                    return (
                        <HStack key={viewerListing.id} alignItems="center" space="md">
                            <GameCalendar.Date date={game.startTime} />
                            <GameCalendar.Item
                                game={game}
                                onPress={() => onGamePress(game.id)}
                                status={
                                    <HStack alignItems="center" space={1}>
                                        <Text color="primary.solid" fontSize="sm">
                                            {viewerListing.name}
                                        </Text>
                                        <MaterialIcon
                                            color="primary.solid"
                                            name="account-check"
                                            size="sm"
                                        />
                                    </HStack>
                                }
                            />
                        </HStack>
                    )
                })}
            </VStack>
        </ScreenContainer>
    )
}
