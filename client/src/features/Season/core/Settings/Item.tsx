import { AntDesign } from '@expo/vector-icons'
import { HStack, Text, Box, IBoxProps, Icon } from 'native-base'
import { ReactNode } from 'react'
import { SeasonSettingsItemGroupChildProps } from './ItemGroup'

export interface SeasonSettingsItemProps
    extends SeasonSettingsItemGroupChildProps,
        IBoxProps {
    title: string
    icon?: ReactNode
    navigateIcon?: boolean
}

export default function SeasonSettingsItem({
    title,
    icon,
    children,
    navigateIcon = true,
    ...rest
}: SeasonSettingsItemProps) {
    return (
        <Box px={3} py={2} {...rest}>
            <HStack alignItems="center" justifyContent="space-between">
                <HStack space={3} alignItems="center">
                    {icon}
                    <Text fontSize="md" fontWeight="medium">
                        {title}
                    </Text>
                </HStack>
                <HStack space={3} alignItems="center">
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
