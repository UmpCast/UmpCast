import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Actionsheet, Divider, Heading, Text, VStack } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import {
    OrganizationRoleType,
    OrgInfoSheet_UserJoinedOrganizationEdgeFragment
} from '@/generated'

import OrganizationActionIcon from '../Action/Icon'
import OrganizationActionItem from '../Action/Item'
import OrgLogo from '../Logo/Logo'

interface OrgInfoSheetProps {
    joinedOrg: OrgInfoSheet_UserJoinedOrganizationEdgeFragment | null
    isOpen: boolean
    onClose: () => void
}

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.Home
>

export default function OrgInfoSheet({
    joinedOrg,
    isOpen,
    onClose
}: OrgInfoSheetProps) {
    const { navigate } = useNavigation<ScreenNavigationProp>()

    if (!joinedOrg) return null

    const { node: org, membership } = joinedOrg

    return (
        <Actionsheet
            hideDragIndicator
            isOpen={isOpen}
            onClose={onClose}
            testID="org-info-sheet"
        >
            <Actionsheet.Content alignItems="stretch" p={4}>
                <VStack space={3}>
                    <OrgLogo org={org} />
                    <VStack space={2}>
                        <Heading color="blueGray.700" fontSize="md">
                            {org.name}
                        </Heading>
                        <Text color="blueGray.600" fontSize="xs">
                            {org.description}
                        </Text>
                    </VStack>
                    <Divider color="blueGray.200" />
                    <VStack>
                        <OrganizationActionItem
                            borderTopRadius={5}
                            icon={<OrganizationActionIcon name="team" />}
                            onPress={() => {
                                navigate(RootStackRoutes.OrgMembers, {
                                    id: org.id
                                })
                                onClose()
                            }}
                            title="Members"
                        />
                        <OrganizationActionItem
                            borderBottomRadius={5}
                            icon={<OrganizationActionIcon name="bells" />}
                            onPress={() => {}}
                            title="Notifications"
                        />
                    </VStack>
                    {membership.role === OrganizationRoleType.Owner ? (
                        <VStack>
                            <OrganizationActionItem
                                borderTopRadius={5}
                                icon={
                                    <OrganizationActionIcon name="calendar" />
                                }
                                onPress={() => {
                                    navigate(RootStackRoutes.OrgSeasons, {
                                        id: org.id
                                    })
                                    onClose()
                                }}
                                title="Seasons"
                            />
                            <OrganizationActionItem
                                borderBottomRadius={5}
                                icon={<OrganizationActionIcon name="setting" />}
                                onPress={() => {
                                    navigate(RootStackRoutes.OrgSettings, {
                                        id: org.id
                                    })
                                    onClose()
                                }}
                                title="Settings"
                            />
                        </VStack>
                    ) : null}
                </VStack>
            </Actionsheet.Content>
        </Actionsheet>
    )
}
