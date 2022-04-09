import { Feather } from '@expo/vector-icons'
import { Icon, Text, VStack } from 'native-base'
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'

export interface SeasonCalendarNoGamesProps extends IVStackProps {}

export default function SeasonCalendarNoGames(
    props: SeasonCalendarNoGamesProps
) {
    return (
        <VStack space={2} alignItems="center" {...props}>
            <Icon as={Feather} name="slash" color="indigo.600" size={10} />
            <Text color="indigo.600">No Games</Text>
        </VStack>
    )
}
