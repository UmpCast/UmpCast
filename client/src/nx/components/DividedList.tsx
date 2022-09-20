import { Divider, IStackProps, VStack } from 'native-base'

import XPressable, { PressableXProps } from './X/PressableX'

interface ContainerProps extends IStackProps {}

function Container(props: ContainerProps) {
    return (
        <VStack
            bg="secondary.100"
            divider={<Divider bg="white" />}
            rounded="sm"
            {...props}
        />
    )
}

function Item(props: PressableXProps) {
    return (
        <XPressable
            _pressed={{ backgroundColor: 'secondary.200' }}
            rounded="sm"
            p={2.5}
            {...props}
        />
    )
}

export default {
    Container,
    Item
}
