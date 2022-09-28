import { Divider, Text, HStack, IStackProps, VStack } from 'native-base'

import XPressable, { PressableXProps } from './PressableX'
import { ReactNode } from 'react'
import MaterialIcon from './MaterialIcon'

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

interface NavigationItemProps {
    onPress: () => void
    name: string
    icon?: ReactNode
    extra?: ReactNode
}

function NavigationItem({ name, icon, extra, onPress }: NavigationItemProps) {
    return (
        <Item onPress={onPress}>
            <HStack alignItems="center" justifyContent="space-between">
                <HStack space="sm" alignItems="center">
                    {icon}
                    <Text>{name}</Text>
                </HStack>
                <HStack alignItems="center" space="md">
                    {extra}
                    <MaterialIcon color="primary.solid" name="chevron-right" />
                </HStack>
            </HStack>
        </Item>
    )
}

export default {
    Container,
    Item,
    NavigationItem
}
