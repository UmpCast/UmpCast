import XPressable, { PressableXProps } from './X/PressableX'
import { Divider, IStackProps, VStack } from 'native-base'
interface ContainerProps extends IStackProps {}

function Container(props: ContainerProps) {
    return (
        <VStack
            divider={<Divider bg="white" />}
            bg="secondary.100"
            rounded="sm"
            {...props}
        />
    )
}

function Item(props: PressableXProps) {
    return (
        <XPressable
            rounded="md"
            p={2.5}
            _pressed={{ backgroundColor: 'secondary.200' }}
            {...props}
        />
    )
}

export default {
    Container,
    Item
}
