import { Divider, Text, HStack, IStackProps, VStack } from 'native-base'
import { ReactNode } from 'react'

import MaterialIcon from './MaterialIcon'
import { ThemedPressableProps } from './ThemedPressable'
import SurfacePressable from './SurfacePressable'

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

function Item(props: ThemedPressableProps) {
    return <SurfacePressable variant="secondary.lite" {...props} />
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
