import XPressable, { PressableXProps } from './X/PressableX'
import { textBoxDefaultProps } from './TextBox'
import { Divider, IStackProps, VStack } from 'native-base'
interface ContainerProps extends IStackProps {}

function Container(props: ContainerProps) {
    return (
        <VStack
            divider={<Divider bg="white" />}
            bg={textBoxDefaultProps.bg}
            rounded={textBoxDefaultProps.rounded}
            {...props}
        />
    )
}

function Item(props: PressableXProps) {
    return (
        <XPressable
            rounded="md"
            p={textBoxDefaultProps.p}
            _pressed={{ backgroundColor: 'secondary.200' }}
            {...props}
        />
    )
}

export default {
    Container,
    Item
}
