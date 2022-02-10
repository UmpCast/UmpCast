import { OrganizationPermissionLevel, OrgInfoSheetFragment } from '@/generated'
import {
    Actionsheet,
    Divider,
    Heading,
    Image,
    Text,
    VStack,
    Button
} from 'native-base'
import OrganizationActionIcon from '../Action/Icon'
import OrganizationActionItem from '../Action/Item'

interface OrgInfoSheetProps {
    permit: OrgInfoSheetFragment | null
    isOpen: boolean
    onClose: () => void
}

export default function OrgInfoSheet({
    permit,
    isOpen,
    onClose
}: OrgInfoSheetProps) {
    if (!permit) return null

    const {
        organization: { profilePicture, title, description },
        permissionLevel
    } = permit

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
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
                        <OrganizationActionItem
                            title="Members"
                            icon={<OrganizationActionIcon name="team" />}
                            onPress={() => {}}
                            borderTopRadius={5}
                        />
                        <OrganizationActionItem
                            title="Notifications"
                            icon={<OrganizationActionIcon name="bells" />}
                            onPress={() => {}}
                            borderBottomRadius={5}
                        />
                    </VStack>
                    {permissionLevel === OrganizationPermissionLevel.Owner ? (
                        <VStack space={2}>
                            <Text fontSize="xs" color="blueGray.400">
                                OWNER ONLY
                            </Text>
                            <VStack>
                                <OrganizationActionItem
                                    title="Seasons"
                                    icon={
                                        <OrganizationActionIcon name="clockcircleo" />
                                    }
                                    borderTopRadius={5}
                                    onPress={() => {}}
                                />
                                <OrganizationActionItem
                                    title="Templates"
                                    icon={
                                        <OrganizationActionIcon name="file1" />
                                    }
                                    onPress={() => {}}
                                />
                                <OrganizationActionItem
                                    title="Profile"
                                    icon={
                                        <OrganizationActionIcon name="edit" />
                                    }
                                    onPress={() => {}}
                                />
                                <OrganizationActionItem
                                    title="Billing"
                                    icon={
                                        <OrganizationActionIcon name="wallet" />
                                    }
                                    borderBottomRadius={5}
                                    onPress={() => {}}
                                />
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
