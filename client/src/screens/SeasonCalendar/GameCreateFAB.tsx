import { Feather } from '@expo/vector-icons'
import { Fab, Icon, IFabProps } from 'native-base'

import { buildID, IconID, TestID } from '@/testing/testID'

export interface GameCreateFABProps extends IFabProps {}

export default function GameCreateFAB({ ...rest }: GameCreateFABProps) {
    return (
        <Fab
            icon={<Icon as={Feather} name="plus" />}
            size="md"
            placement="bottom-right"
            testID={buildID(TestID.ICON, IconID.GAME_CREATE)}
            {...rest}
        />
    )
}
