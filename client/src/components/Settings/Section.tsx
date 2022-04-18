import { Text, VStack, HStack } from 'native-base'
import { ReactNode } from 'react'

export interface SettingsSectionProps {
    title?: string
    rightHeader?: ReactNode
    caption?: string
    children: ReactNode
}

export default function SettingsSection({
    title,
    rightHeader,
    caption,
    children
}: SettingsSectionProps) {
    return (
        <VStack space={2}>
            <HStack alignItems="center" justifyContent="space-between">
                <Text color="blueGray.400">{title}</Text>
                {rightHeader}
            </HStack>
            {children}
            <Text color="blueGray.400" fontSize="sm">
                {caption}
            </Text>
        </VStack>
    )
}
