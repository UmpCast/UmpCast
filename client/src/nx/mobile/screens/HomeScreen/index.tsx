import { format, isSameDay } from 'date-fns'
import { HStack, VStack, Text, Box, Avatar, Heading } from 'native-base'

import MaterialIcon from '@/nx/components/MaterialIcon'
import ScreenContainer from '@/nx/components/ScreenContainer'

import { useScreenQuery } from './index.generated'
import GameCalendar from '@/nx/features/GameCalendar'

export default function HomeScreen() {
    const [{ data }] = useScreenQuery()

    if (!data?.viewer) {
        return null
    }

    const { viewer } = data
    const { assignedListings } = viewer

    return (
        <ScreenContainer title="Home">
            <VStack space="md">
                <Heading size="md">Your Upcoming Games</Heading>
                {assignedListings.map((viewerListing, i) => {
                    const { game } = viewerListing

                    const newDay =
                        i == 0 || !isSameDay(assignedListings[i - 1].game.startTime, game.startTime)

                    return (
                        <HStack key={viewerListing.id} alignItems="center" space="md">
                            {newDay ? (
                                <GameCalendar.Date date={game.startTime} />
                            ) : (
                                <GameCalendar.EmptyDate />
                            )}
                            <GameCalendar.Item
                                game={game}
                                status={
                                    <HStack alignItems="center" space={1}>
                                        <Text color="primary.600" fontSize="sm">
                                            {viewerListing.name}
                                        </Text>
                                        <MaterialIcon
                                            color="primary.600"
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
