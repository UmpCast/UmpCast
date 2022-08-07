import { Feather } from '@expo/vector-icons'
import { Icon, Text, VStack } from 'native-base'
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'

export interface SeasonCalendarNoGamesProps extends IVStackProps {}

export default function SeasonCalendarNoGames(
    props: SeasonCalendarNoGamesProps
) {
    return (
        <VStack alignItems="center" space={2} {...props}>
            <Icon as={Feather} color="indigo.600" name="slash" button={10} />
            <Text color="indigo.600">No Games</Text>
        </VStack>
    )
}
