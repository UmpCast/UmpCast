import {
    OrganizationInfoActionsheetFragment,
    OrganizationPermissionLevel
} from '@/generated'
import { AntDesign } from '@expo/vector-icons'
import {
    Actionsheet,
    Divider,
    Heading,
    HStack,
    Icon,
    Image,
    Text,
    useDisclose,
    VStack,
    Pressable,
    IPressableProps,
    ITextProps,
    Button
} from 'native-base'

interface OrganizationInfoActionsheetProps {
    permit: OrganizationInfoActionsheetFragment
}

export function ActionItem({ children, ...rest }: IPressableProps) {
    return (
        <Pressable
            px={3}
            py={2}
            bgColor="blueGray.200"
            _hover={{ bgColor: 'blueGray.300' }}
            {...rest}
        >
            <HStack space={4} alignItems="center">
                {children}
            </HStack>
        </Pressable>
    )
}

export function ActionText(props: ITextProps) {
    return (
        <Text
            fontSize="xs"
            fontWeight="medium"
            color="blueGray.600"
            {...props}
        />
    )
}

export default function OrganizationInfoActionsheet({
    permit
}: OrganizationInfoActionsheetProps) {
    const {
        organization: { profilePicture, title, description },
        permissionLevel
    } = permit
    const props = useDisclose(true)
    return (
        <Actionsheet {...props} hideDragIndicator>
            <Actionsheet.Content p={4} alignItems="stretch">
                <VStack space={3}>
                    {profilePicture && (
                        <Image
                            src={profilePicture}
                            alt="organizaton-profile-picture"
                            size={45}
                            borderRadius={5}
                        />
                    )}
                    <VStack space={2}>
                        <Heading fontSize="md" color="blueGray.700">
                            {title}
                        </Heading>
                        <Text fontSize="xs" color="blueGray.600">
                            {description}
                        </Text>
                    </VStack>
                    <Divider color="blueGray.200" />
                    <VStack>
                        <ActionItem borderTopRadius={5}>
                            <Icon
                                as={AntDesign}
                                name="team"
                                size={4}
                                color="indigo.500"
                            />
                            <ActionText>Members</ActionText>
                        </ActionItem>
                        <ActionItem borderBottomRadius={5}>
                            <Icon
                                as={AntDesign}
                                name="bells"
                                size={4}
                                color="indigo.500"
                            />
                            <ActionText>Notifications</ActionText>
                        </ActionItem>
                    </VStack>
                    {permissionLevel === OrganizationPermissionLevel.Owner ? (
                        <VStack space={2}>
                            <Text fontSize="xs" color="blueGray.400">
                                OWNER ONLY
                            </Text>
                            <VStack>
                                <ActionItem borderTopRadius={5}>
                                    <Icon
                                        as={AntDesign}
                                        name="clockcircleo"
                                        size={4}
                                        color="indigo.500"
                                    />
                                    <ActionText>Seasons</ActionText>
                                </ActionItem>
                                <ActionItem>
                                    <Icon
                                        as={AntDesign}
                                        name="file1"
                                        size={4}
                                        color="indigo.500"
                                    />
                                    <ActionText>Templates</ActionText>
                                </ActionItem>
                                <ActionItem>
                                    <Icon
                                        as={AntDesign}
                                        name="edit"
                                        size={4}
                                        color="indigo.500"
                                    />
                                    <ActionText>Profile</ActionText>
                                </ActionItem>
                                <ActionItem borderBottomRadius={5}>
                                    <Icon
                                        as={AntDesign}
                                        name="wallet"
                                        size={4}
                                        color="indigo.500"
                                    />
                                    <ActionText>Billing</ActionText>
                                </ActionItem>
                            </VStack>
                        </VStack>
                    ) : null}
                    <Button
                        bgColor="blueGray.200"
                        _hover={{ bgColor: 'blueGray.300' }}
                    >
                        <Text color="indigo.500" fontWeight="medium">
                            Leave Organization
                        </Text>
                    </Button>
                </VStack>
            </Actionsheet.Content>
        </Actionsheet>
    )
}
