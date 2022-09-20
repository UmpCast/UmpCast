import { useIsFocused } from '@react-navigation/native'
import { format, isBefore, isSameDay, isSameMonth } from 'date-fns'
import { Box, FlatList, HStack, VStack, Text, Fab } from 'native-base'
import { useEffect, useRef } from 'react'
import { FlatList as RNFlatList } from 'react-native'

import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import MaterialIcon from '@/nx/components/MaterialIcon'
import { GameItemFragment } from './GameItem.generated'
import { useScreenQuery } from './index.generated'
import UserAvatar from '@/features/User/Avatar'
import PressableX from '@/nx/components/PressableX'
import ScreenContainer from '@/components/Screen/Container'

export type SeasonCalendarScreenProps = RootStackScreenProps<RootStackRoute.SeasonCalendar>

const ITEM_HEIGHT = 65.06666564941406

type CalendarGame = {
    newMonth?: boolean
    newDay?: boolean
    game: GameItemFragment
}

function toCalendarGame(games: GameItemFragment[]): CalendarGame[] {
    return games.map((game, index) => {
        const startTime = new Date(game.startTime)

        if (index === 0) {
            return {
                newMonth: true,
                newDay: true,
                game
            }
        }

        const prevStartTime = new Date(games[index - 1].startTime)

        return {
            newMonth: !isSameMonth(prevStartTime, startTime),
            newDay: !isSameDay(prevStartTime, startTime),
            game
        }
    })
}

export default function SeasonCalendarScreen({ navigation, route }: SeasonCalendarScreenProps) {
    const {
        params: { seasonId }
    } = route

    const { navigate, setOptions } = navigation

    const isFocused = useIsFocused()

    const ref = useRef<RNFlatList>()

    const [{ data }] = useScreenQuery({
        variables: {
            seasonId
        }
    })

    useEffect(() => {
        setOptions({
            headerRight: () => (
                <Box mr={4}>
                    <HStack alignItems="center" space={1} />
                </Box>
            )
        })
    }, [setOptions])

    useEffect(() => {
        const games = data?.season?.games

        if (!games?.length) {
            return
        }

        const scrollToDate = new Date()

        let index = games.findIndex((game) => !isBefore(new Date(game.startTime), scrollToDate))

        if (index == -1) {
            index = games.length - 1
        }

        ref.current?.scrollToIndex({
            index
        })
    }, [data])

    const onCreateGamePress = () => {
        navigate(RootStackRoute.SeasonGameNew, {
            seasonId
        })
    }

    if (!data?.season) return null

    const { season } = data
    const { games, viewerCanCreateGame } = season
    const calendarGames = toCalendarGame(games)

    const showCreateGameFab = isFocused && viewerCanCreateGame

    return (
        <ScreenContainer>
            <VStack space={4}>
                {calendarGames.length > 0 ? (
                    <FlatList
                        ref={ref}
                        data={calendarGames}
                        getItemLayout={(_, index) => ({
                            length: ITEM_HEIGHT,
                            offset: ITEM_HEIGHT * index,
                            index
                        })}
                        keyExtractor={(item: CalendarGame) => item.game.id}
                        renderItem={({ item }) => {
                            const { newDay, game } = item

                            const gameDetails =
                                format(game.startTime, 'h:mm aa') +
                                (game.location ? ` at ${game.location}` : '')

                            return (
                                <HStack key={game.id} space={1} mb={2}>
                                    <Box mt={1.5} width="30px">
                                        {newDay ? (
                                            <VStack alignItems="center">
                                                <Text fontSize="xs" color="secondary.400">
                                                    {format(game.startTime, 'EEE').toUpperCase()}
                                                </Text>
                                                <Text fontSize="lg" color="primary.600">
                                                    {format(game.startTime, 'd')}
                                                </Text>
                                            </VStack>
                                        ) : null}
                                    </Box>
                                    <PressableX
                                        variant="secondary.ghost"
                                        flex={1}
                                        size="sm"
                                        rounded="sm"
                                    >
                                        <VStack space={1}>
                                            <HStack justifyContent="space-between">
                                                <Text fontWeight="semibold" fontSize="sm">
                                                    {game.name}
                                                </Text>
                                            </HStack>
                                            <HStack
                                                justifyContent="space-between"
                                                alignItems="center"
                                                space={1}
                                            >
                                                <Text
                                                    color="secondary.400"
                                                    fontSize="sm"
                                                    isTruncated={true}
                                                >
                                                    {gameDetails}
                                                </Text>
                                                <HStack space={1}>
                                                    {game.listings.map((listing) => {
                                                        const assignee = listing.assignee?.node
                                                        if (!assignee) return

                                                        return (
                                                            <UserAvatar
                                                                size="5"
                                                                key={listing.id}
                                                                user={assignee}
                                                            />
                                                        )
                                                    })}
                                                </HStack>
                                            </HStack>
                                        </VStack>
                                    </PressableX>
                                </HStack>
                            )
                        }}
                    />
                ) : (
                    <VStack alignItems="center" space={2}>
                        <Text color="indigo.600">No Games</Text>
                    </VStack>
                )}
            </VStack>
            {showCreateGameFab && (
                <Fab
                    icon={<MaterialIcon name="plus" />}
                    placement="bottom-right"
                    onPress={onCreateGamePress}
                />
            )}
        </ScreenContainer>
    )
}
