import { buildID, IconID, TestID } from '@/testing/testID'
import { Feather } from '@expo/vector-icons'
import { Fab, Icon, IFabProps } from 'native-base'

export interface GameCreateFABProps extends IFabProps {}

export default function GameCreateFAB({ ...rest }: GameCreateFABProps) {
    return (
        <Fab
            position="absolute"
            size="md"
            testID={buildID(TestID.ICON, IconID.GAME_CREATE)}
            icon={<Icon as={Feather} name="plus" />}
            colorScheme="indigo"
            {...rest}
        />
    )
}
