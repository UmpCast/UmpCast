import { Pressable, Text, HStack, IPressableProps } from 'native-base'

export interface OrganizationActionItemProps extends IPressableProps {
    title: string
    icon: React.ReactNode
    children?: React.ReactNode
}

export default function OrganizationActionItem({
    title,
    icon,
    children,
    ...rest
}: OrganizationActionItemProps) {
    return (
        <Pressable
            _hover={{ bgColor: 'blueGray.300' }}
            bgColor="blueGray.200"
            px={3}
            py={2}
            {...rest}
        >
            <HStack alignItems="center" space={4}>
                {icon}
                <Text color="blueGray.600" fontSize="xs" fontWeight="medium">
                    {title}
                </Text>
                {children}
            </HStack>
        </Pressable>
    )
}
