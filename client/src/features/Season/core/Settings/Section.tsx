import { ReactNode } from 'react'
import { Text, VStack, HStack } from 'native-base'

export interface SeasonSettingsSectionProps {
    title?: string
    rightHeader?: ReactNode
    caption?: string
    children: ReactNode
}

export default function SeasonSettingsSection({
    title,
    rightHeader,
    caption,
    children
}: SeasonSettingsSectionProps) {
    return (
        <VStack space={2}>
            <HStack justifyContent="space-between" alignItems="center">
                <Text color="blueGray.400">{title}</Text>
                {rightHeader}
            </HStack>
            {children}
            <Text fontSize="sm" color="blueGray.400">
                {caption}
            </Text>
        </VStack>
    )
}
