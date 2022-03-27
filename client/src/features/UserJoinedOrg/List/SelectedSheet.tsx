import {
    Actionsheet,
    Divider,
    Heading,
    IActionsheetProps,
    Text,
    VStack
} from 'native-base'

import {
    OrgInfoSheet_UserJoinedOrganizationEdgeFragment,
    OrganizationRoleType
} from '@/generated'

import UserJoinedOrgListSelectedSheetIcon from './SelectedSheetIcon'
import UserJoinedOrgListSelectedSheetItem from './SelectedSheetItem'
import { AppRootStackRoute } from '@/navigation/navigators/Root/Stack'
import OrgProfileLogo from '@/features/Org/core/Profile/Logo'
import { AppRootStackScreenProps } from '@/navigation/screenProps'

interface OrgInfoSheetProps extends IActionsheetProps {
    joinedOrg: OrgInfoSheet_UserJoinedOrganizationEdgeFragment | null
    navigation: AppRootStackScreenProps['navigation']
}

export default function UserJoinedOrgListSelectedSheet({
    joinedOrg,
    navigation,
    ...rest
}: OrgInfoSheetProps) {
    const { onClose = () => {} } = rest
    const { navigate } = navigation

    if (!joinedOrg) return null

    const { node: org, membership } = joinedOrg

    return (
        <Actionsheet {...rest}>
            <Actionsheet.Content alignItems="stretch" p={4}>
                <VStack space={3}>
                    <OrgProfileLogo org={org} />
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
                        <UserJoinedOrgListSelectedSheetItem
                            borderTopRadius={5}
                            icon={
                                <UserJoinedOrgListSelectedSheetIcon name="team" />
                            }
                            onPress={() => {
                                navigate(AppRootStackRoute.OrgMembers, {
                                    id: org.id
                                })
                                onClose()
                            }}
                            title="Members"
                        />
                        <UserJoinedOrgListSelectedSheetItem
                            borderBottomRadius={5}
                            icon={
                                <UserJoinedOrgListSelectedSheetIcon name="bells" />
                            }
                            onPress={() => {}}
                            title="Notifications"
                        />
                    </VStack>
                    {membership.role === OrganizationRoleType.Owner ? (
                        <VStack>
                            <UserJoinedOrgListSelectedSheetItem
                                borderTopRadius={5}
                                icon={
                                    <UserJoinedOrgListSelectedSheetIcon name="calendar" />
                                }
                                onPress={() => {
                                    navigate(AppRootStackRoute.OrgSeasons, {
                                        id: org.id
                                    })
                                    onClose()
                                }}
                                title="Seasons"
                            />
                            <UserJoinedOrgListSelectedSheetItem
                                borderBottomRadius={5}
                                icon={
                                    <UserJoinedOrgListSelectedSheetIcon name="setting" />
                                }
                                onPress={() => {
                                    navigate(AppRootStackRoute.OrgSettings, {
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
