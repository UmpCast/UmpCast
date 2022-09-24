import MaterialIcon from '@/nx/components/MaterialIcon'
import PressableX from '@/nx/components/PressableX'
import ScreenContainer from '@/nx/components/ScreenContainer'
import TextBox from '@/nx/components/TextBox'
import { format } from 'date-fns'
import { HStack, Box, VStack, Text } from 'native-base'
import { useScreenQuery } from './index.generated'

export default function GameSearchScreen() {
    const [{ data: screenData }] = useScreenQuery()

    if (!screenData?.viewer) {
        return null
    }

    const { viewer } = screenData
    const { games } = viewer

    if (!games) {
        return null
    }

    return (
        <ScreenContainer title="Search">
            <VStack space="md">
                {games.map((game) => {
                    const gameDetails =
                        format(game.startTime, 'h:mm aa') +
                        (game.location ? ` at ${game.location}` : '')

                    return (
                        <HStack space={4} alignItems="center" key={game.id}>
                            <Box width="30px">
                                <VStack alignItems="center">
                                    <Text color="secondary.400" fontSize="xs">
                                        {format(game.startTime, 'EEE').toUpperCase()}
                                    </Text>
                                    <Text color="primary.600" fontSize="lg">
                                        {format(game.startTime, 'd')}
                                    </Text>
                                </VStack>
                            </Box>
                            <TextBox flex={1}>
                                <VStack space={1} flex={1}>
                                    <HStack justifyContent="space-between">
                                        <Text fontSize="sm" fontWeight="semibold">
                                            {game.name}
                                        </Text>
                                        <HStack space={1} alignItems="center">
                                            <Text color="primary.600" fontSize="sm">
                                                {' '}
                                                3 / 5 Left
                                            </Text>
                                            <MaterialIcon
                                                name="lock-open"
                                                color="primary.600"
                                                size="sm"
                                            />
                                        </HStack>
                                    </HStack>
                                    <HStack space={2} justifyContent="space-between">
                                        <Text color="secondary.400" fontSize="sm" isTruncated>
                                            {gameDetails}
                                        </Text>
                                        {/* <Avatar.Group _avatar={{ size: '5' }}>
                                            {game.listings.map((listing, i) => {
                                                const assignee = listing.assignee?.node
                                                return (
                                                    <Avatar
                                                        key={listing.id}
                                                        mr={i == game.listings.length - 1 ? 0 : 2.5}
                                                        source={{
                                                            uri: assignee?.profilePictureUrl ?? ''
                                                        }}
                                                    />
                                                )
                                            })}
                                        </Avatar.Group> */}
                                    </HStack>
                                </VStack>
                            </TextBox>
                        </HStack>
                    )
                })}
            </VStack>
        </ScreenContainer>
    )
}
