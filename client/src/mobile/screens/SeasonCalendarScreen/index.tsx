import { useIsFocused, useNavigationState } from '@react-navigation/native'
import { format, isBefore, isSameDay } from 'date-fns'
import { FlatList, HStack, VStack, Text, Fab } from 'native-base'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList as RNFlatList, ViewToken } from 'react-native'
import MaterialIcon from '@/components/MaterialIcon'
import ScreenContainer from '@/components/ScreenContainer'
import GameCalendar from '@/features/GameCalendar'
import { GameCalendarItemFragment } from '@/features/GameCalendar/Item.generated'
import { NavRoute } from "@/mobile/navigation/routes"
import { TabsStackScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'

export type SeasonCalendarScreenProps =
    TabsStackScreenProps<NavRoute.SeasonCalendar>

const ITEM_HEIGHT = 62.181819915771484

export default function SeasonCalendarScreen({
    navigation,
    route
}: SeasonCalendarScreenProps) {
    const {
        params: { seasonId }
    } = route

    const { navigate } = navigation

    const ref = useRef<RNFlatList>()

    const [{ data }] = useScreenQuery({
        variables: {
            seasonId
        }
    })

    useEffect(() => {
        const games = data?.season?.games

        if (!games?.length) {
            return
        }

        const scrollToDate = new Date()

        let index = games.findIndex(
            (game) => !isBefore(new Date(game.startTime), scrollToDate)
        )

        if (index === -1) {
            index = games.length - 1
        }

        ref.current?.scrollToIndex({
            index
        })
    }, [data])

    if (!data?.season) {
        return null
    }

    const { season } = data
    const { games } = season

    const onCreateGamePress = () => {
        navigate(NavRoute.CreateGame, {
            seasonId
        })
    }
    const onGamePress = (gameId: string) => {
        navigate(NavRoute.Game, {
            gameId
        })
    }

    return (
        <>
            <ScreenContainer title="Calendar" px={0}>
                <VStack space={4}>
                    {games.length > 0 ? (
                        <FlatList
                            ref={ref}
                            data={games}
                            getItemLayout={(_, index) => ({
                                length: ITEM_HEIGHT,
                                offset: ITEM_HEIGHT * index,
                                index
                            })}
                            keyExtractor={(item: GameCalendarItemFragment) =>
                                item.id
                            }
                            renderItem={({ item: game, index }) => {
                                const newDay =
                                    index === 0 ||
                                    !isSameDay(
                                        games[index - 1].startTime,
                                        game.startTime
                                    )

                                return (
                                    <HStack
                                        key={game.id}
                                        alignItems="center"
                                        mx={3}
                                        mb={4}
                                        space="md"
                                    >
                                        {newDay ? (
                                            <GameCalendar.Date
                                                date={game.startTime}
                                            />
                                        ) : (
                                            <GameCalendar.EmptyDate />
                                        )}
                                        <GameCalendar.Item
                                            game={game}
                                            onPress={() => onGamePress(game.id)}
                                            status={
                                                <GameCalendar.AssignmentStatus
                                                    game={game}
                                                />
                                            }
                                        />
                                    </HStack>
                                )
                            }}
                        />
                    ) : (
                        <Text color="indigo.600">No Games</Text>
                    )}
                </VStack>
            </ScreenContainer>
            <Fab
                mr="20px"
                mb="20px"
                icon={<MaterialIcon name="plus" size="xl" />}
                onPress={onCreateGamePress}
                placement="bottom-right"
                renderInPortal={false}
            />
        </>
    )
}
