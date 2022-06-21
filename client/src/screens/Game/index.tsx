import { Heading, HStack, Icon, Text, VStack } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import OrgProfileLogo from '@/features/Org/core/Profile/Logo'
import { useGameScreenQuery } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/types'
import { Feather } from '@expo/vector-icons'
import { UserAvatar } from '@/features/User/components/Avatar'

type GameScreenProps = RootStackScreenProps<RootStackRoute.Game>

export default function GameScreen({ route }: GameScreenProps) {
    const { params } = route
    const { gameId } = params

    const [{ data }] = useGameScreenQuery({
        variables: {
            gameId
        }
    })

    if (!data) return null
    const { game } = data
    if (!game) return null

    const { division } = game
    const { season } = division
    const { organization } = season

    return (
        <ScreenContainer>
            <VStack space={4}>
                <VStack>
                    <HStack alignItems="center" space={3}>
                        <OrgProfileLogo org={organization} size={20} />
                        <Text
                            color="secondary.500"
                            fontSize="md"
                            fontWeight="semibold"
                        >
                            {season.name} / {division.name}
                        </Text>
                    </HStack>
                    <Heading>{game.name}</Heading>
                </VStack>
                <HStack space="3">
                    <Icon as={Feather} name="clock" />
                    <Text>Fri, Mar 3 12pm - 1:30pm</Text>
                </HStack>
                <HStack space="3">
                    <Icon as={Feather} name="map-pin" />
                    <Text>Mitchell Field Ball Park</Text>
                </HStack>
                <Text bold>Assignees</Text>
                <UserAvatar></UserAvatar>
            </VStack>
        </ScreenContainer>
    )
}
