import { AntDesign } from '@expo/vector-icons'
import { HStack, Text, Box, IBoxProps, Icon } from 'native-base'
import { ReactNode } from 'react'

import { SettingsItemGroupChildProps } from './ItemGroup'

export interface SettingsItemProps
    extends SettingsItemGroupChildProps,
        IBoxProps {
    title: string
    icon?: ReactNode
    navigateIcon?: boolean
}

export default function SettingsItem({
    title,
    icon,
    children,
    navigateIcon = true,
    ...rest
}: SettingsItemProps) {
    return (
        <Box px={3} py={2} {...rest}>
            <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center" space={3}>
                    {icon}
                    <Text fontSize="md" fontWeight="medium">
                        {title}
                    </Text>
                </HStack>
                <HStack alignItems="center" space={3}>
                    {children}
                    {navigateIcon && (
                        <Icon
                            as={AntDesign}
                            color="indigo.500"
                            name="right"
                            size={4}
                        />
                    )}
                </HStack>
            </HStack>
        </Box>
    )
}
