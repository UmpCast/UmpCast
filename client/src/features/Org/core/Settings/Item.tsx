import { HStack, Text, Button as NBButton } from 'native-base'

export default function OrgSettingsItem({
    icon,
    title,
    onPress
}: {
    icon: React.ReactNode
    title: string
    onPress: () => any
}) {
    return (
        <NBButton
            colorScheme="blueGray"
            justifyContent="flex-start"
            onPress={onPress}
            size="sm"
            variant="ghost"
        >
            <HStack space={4}>
                {icon}
                <Text color="blueGray.700" fontWeight="medium">
                    {title}
                </Text>
            </HStack>
        </NBButton>
    )
}
