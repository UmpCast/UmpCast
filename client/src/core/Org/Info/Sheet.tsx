import {
    Actionsheet,
    Divider,
    Heading,
    Image,
    Text,
    VStack,
    Button
} from 'native-base'

import {
    OrganizationPermissionLevel,
    OrgInfoSheetFragment,
    useOrgLeaveMutation
} from '@/generated'

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

    const [_, leaveOrg] = useOrgLeaveMutation()
    const onLeavePress = async () => {
        onClose()
        leaveOrg({ id: permit.organization.id })
    }

    return (
        <Actionsheet
            hideDragIndicator
            isOpen={isOpen}
            onClose={onClose}
            testID="org-info-sheet"
        >
            <Actionsheet.Content alignItems="stretch" p={4}>
                <VStack space={3}>
                    {profilePicture && (
                        <Image
                            alt="organizaton-profile-picture"
                            borderRadius={5}
                            size={45}
                            src={profilePicture}
                        />
                    )}
                    <VStack space={2}>
                        <Heading color="blueGray.700" fontSize="md">
                            {title}
                        </Heading>
                        <Text color="blueGray.600" fontSize="xs">
                            {description}
                        </Text>
                    </VStack>
                    <Divider color="blueGray.200" />
                    <VStack>
                        <OrganizationActionItem
                            borderTopRadius={5}
                            icon={<OrganizationActionIcon name="team" />}
                            onPress={() => {}}
                            title="Members"
                        />
                        <OrganizationActionItem
                            borderBottomRadius={5}
                            icon={<OrganizationActionIcon name="bells" />}
                            onPress={() => {}}
                            title="Notifications"
                        />
                    </VStack>
                    {permissionLevel === OrganizationPermissionLevel.Owner ? (
                        <VStack space={2}>
                            <Text color="blueGray.400" fontSize="xs">
                                OWNER ONLY
                            </Text>
                            <VStack>
                                <OrganizationActionItem
                                    borderTopRadius={5}
                                    icon={
                                        <OrganizationActionIcon name="clockcircleo" />
                                    }
                                    onPress={() => {}}
                                    title="Seasons"
                                />
                                <OrganizationActionItem
                                    icon={
                                        <OrganizationActionIcon name="file1" />
                                    }
                                    onPress={() => {}}
                                    title="Templates"
                                />
                                <OrganizationActionItem
                                    icon={
                                        <OrganizationActionIcon name="edit" />
                                    }
                                    onPress={() => {}}
                                    title="Profile"
                                />
                                <OrganizationActionItem
                                    borderBottomRadius={5}
                                    icon={
                                        <OrganizationActionIcon name="wallet" />
                                    }
                                    onPress={() => {}}
                                    title="Billing"
                                />
                            </VStack>
                        </VStack>
                    ) : null}
                    <Button
                        _hover={{ bgColor: 'blueGray.300' }}
                        bgColor="blueGray.200"
                    >
                        <Text
                            color="indigo.500"
                            fontWeight="medium"
                            onPress={onLeavePress}
                        >
                            Leave Organization
                        </Text>
                    </Button>
                </VStack>
            </Actionsheet.Content>
        </Actionsheet>
    )
}
