import {
    HStack,
    Text,
    Button as NBButton,
    Icon as NBIcon,
    IIconProps
} from 'native-base'

function Item({
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
            variant="ghost"
            size="sm"
            colorScheme="blueGray"
            justifyContent="flex-start"
            onPress={onPress}
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

function Icon(props: IIconProps) {
    return <NBIcon {...props} color="blueGray.500" />
}

const OrgSettingsList = {
    Item,
    Icon
}

export default OrgSettingsList
