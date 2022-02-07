import { Pressable, Text, HStack } from 'native-base'

export interface OrganizationActionItemProps {
    title: string
    icon: JSX.Element
    children?: JSX.Element
    onPress: () => void
}

export default function OrganizationActionItem({
    title,
    icon,
    children,
    onPress
}: OrganizationActionItemProps) {
    return (
        <Pressable
            px={3}
            py={2}
            bgColor="blueGray.200"
            _hover={{ bgColor: 'blueGray.300' }}
            onPress={onPress}
        >
            <HStack space={4} alignItems="center">
                {icon}
                <Text fontSize="xs" fontWeight="medium" color="blueGray.600">
                    {title}
                </Text>
                {children}
            </HStack>
        </Pressable>
    )
}
