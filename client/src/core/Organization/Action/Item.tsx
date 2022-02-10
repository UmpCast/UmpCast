import { Pressable, Text, HStack, IPressableProps } from 'native-base'

export interface OrganizationActionItemProps extends IPressableProps {
    title: string
    icon: JSX.Element
    children?: JSX.Element
}

export default function OrganizationActionItem({
    title,
    icon,
    children,
    ...rest
}: OrganizationActionItemProps) {
    return (
        <Pressable
            px={3}
            py={2}
            bgColor="blueGray.200"
            _hover={{ bgColor: 'blueGray.300' }}
            {...rest}
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
