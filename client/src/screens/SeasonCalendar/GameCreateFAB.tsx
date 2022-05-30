import { Feather } from '@expo/vector-icons'
import { Fab, Icon, IFabProps } from 'native-base'

import { buildID, IconID, TestID } from '@/testing/testID'

export interface GameCreateFABProps extends IFabProps {}

export default function GameCreateFAB({ ...rest }: GameCreateFABProps) {
    return (
        <Fab
            icon={<Icon as={Feather} name="plus" />}
            placement="bottom-right"
            size="md"
            testID={buildID(TestID.ICON, IconID.GAME_CREATE)}
            {...rest}
        />
    )
}
