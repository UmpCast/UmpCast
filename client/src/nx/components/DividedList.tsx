import {
    Divider,
    HStack,
    IStackProps,
    VStack,
    Pressable as NBPressable,
    IPressableProps
} from 'native-base'
interface ContainerProps extends IStackProps {}

function Container(props: ContainerProps) {
    return (
        <VStack
            bg="secondary.100"
            divider={<Divider bg="white" />}
            rounded="sm"
            zIndex={-1}
            {...props}
        />
    )
}

interface ItemProps extends IStackProps {}

function Item(props: ItemProps) {
    return <HStack p={2.5} {...props} />
}

function Pressable(props: IPressableProps) {
    return (
        <NBPressable
            rounded="sm"
            _pressed={{ backgroundColor: 'secondary.200' }}
            {...props}
        />
    )
}

export default {
    Container,
    Item,
    Pressable
}
