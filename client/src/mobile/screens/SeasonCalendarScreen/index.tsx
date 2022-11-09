import { isAfter, isSameDay, startOfDay } from 'date-fns'
import { FlatList, HStack, VStack, Text, Box } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { FlatList as RNFlatList, Platform } from 'react-native'
import MaterialIcon from '@/components/MaterialIcon'
import ScreenContainer from '@/components/ScreenContainer'
import GameCalendar from '@/features/GameCalendar'
import { GameCalendarItemFragment } from '@/features/GameCalendar/Item.generated'
import { NavRoute } from '@/mobile/navigation/routes'
import { TabsStackScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'
import ActionFab from '@/components/ActionFab'

export type SeasonCalendarScreenProps =
    TabsStackScreenProps<NavRoute.SeasonCalendar>

const ITEM_HEIGHT = Platform.OS == 'android' ? 62.181819915771484 : 78

export default function SeasonCalendarScreen({
    navigation,
    route
}: SeasonCalendarScreenProps) {
    const {
        params: { seasonId }
    } = route

    const { navigate } = navigation

    const flatListRef = useRef<RNFlatList>()

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

        const now = new Date()

        let index = games.findIndex((game) =>
            isAfter(new Date(game.startTime), startOfDay(now))
        )

        if (index === -1) {
            index = games.length - 1
        }

        setTimeout(() => {
            flatListRef.current?.scrollToIndex({
                index
            })
        }, 500)
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
                            ref={flatListRef}
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
            <ActionFab
                icon={<MaterialIcon name="plus" size="xl" />}
                onPress={onCreateGamePress}
            />
        </>
    )
}
