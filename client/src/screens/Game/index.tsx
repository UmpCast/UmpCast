import { RootStackScreenProps } from '@/navigation/types'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import ScreenContainer from '@/components/Screen/Container'
import { Heading, HStack, Text, VStack } from 'native-base'
import { gql } from 'graphql-tag'
import { useGameScreenQuery } from '@/generated'
import OrgProfileLogo from '@/features/Org/core/Profile/Logo'

type GameScreenProps = RootStackScreenProps<RootStackRoute.Game>

export default function GameScreen({ navigation, route }: GameScreenProps) {
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
            <VStack space={2}>
                <HStack space={3} alignItems="center">
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
        </ScreenContainer>
    )
}
