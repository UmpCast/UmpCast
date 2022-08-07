import { HStack, Text } from 'native-base'
import MaterialIcon from '../../components/MaterialIcon'
import {
    PositionTitle_DivisionFragment,
    PositionTitle_PositionFragment
} from './index.generated'

interface Props {
    division: PositionTitle_DivisionFragment
    position: PositionTitle_PositionFragment
}

export default function PositionTitle({ division, position }: Props) {
    return (
        <HStack alignItems="center" space={2}>
            <MaterialIcon name="account" />
            <Text>
                {division.name} / {position.name}
            </Text>
        </HStack>
    )
}
