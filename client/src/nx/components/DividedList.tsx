import { Divider, IStackProps, VStack } from 'native-base'

import XPressable, { PressableXProps } from './PressableX'

interface ContainerProps extends IStackProps {}

function Container(props: ContainerProps) {
    return <VStack bg="secondary.lite" divider={<Divider bg="white" />} rounded="sm" {...props} />
}

function Item(props: PressableXProps) {
    return (
        <XPressable
            _pressed={{ backgroundColor: 'secondary.subtle' }}
            p={2.5}
            rounded="sm"
            {...props}
        />
    )
}

export default {
    Container,
    Item
}
