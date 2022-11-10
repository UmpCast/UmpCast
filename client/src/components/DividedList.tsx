import {
    Divider,
    Text,
    HStack,
    IStackProps,
    VStack,
    IBoxProps,
    Box
} from 'native-base'
import { ReactNode } from 'react'

import XPressable, { AppPressableProps } from './AppPressable'
import MaterialIcon from './MaterialIcon'

type ContainerProps = IStackProps

function Group(props: ContainerProps) {
    return (
        <VStack
            bg="secondary.lite"
            divider={<Divider bg="secondary.subtle" />}
            rounded="sm"
            {...props}
        />
    )
}

function Item(props: AppPressableProps) {
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
                <HStack alignItems="center" space="sm">
                    {icon}
                    <Text>{name}</Text>
                </HStack>
                <HStack alignItems="center" space="sm">
                    {extra}
                    <MaterialIcon color="primary.solid" name="chevron-right" />
                </HStack>
            </HStack>
        </Item>
    )
}

export default {
    Group,
    Item,
    NavigationItem
}
