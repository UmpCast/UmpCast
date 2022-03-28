import { Text, VStack, HStack } from 'native-base'
import { ReactNode } from 'react'

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
