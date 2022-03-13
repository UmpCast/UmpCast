import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
    Actionsheet,
    Divider,
    Heading,
    IActionsheetProps,
    Text,
    VStack
} from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import {
    OrganizationRoleType,
    OrgInfoSheet_UserJoinedOrganizationEdgeFragment
} from '@/generated'

import UserJoinedOrgSheetIcon from '@/core/User/JoinedOrg/Info/SheetIcon'
import OrganizationActionItem from '@/core/Org/Action/SheetItem'
import OrgInfoLogo from '@/core/Org/Info/Logo'

interface OrgInfoSheetProps extends IActionsheetProps {
    joinedOrg: OrgInfoSheet_UserJoinedOrganizationEdgeFragment | null
}

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.Home
>

export default function UserJoinedOrgSheet({
    joinedOrg,
    ...rest
}: OrgInfoSheetProps) {
    const { onClose = () => {} } = rest
    const { navigate } = useNavigation<ScreenNavigationProp>()

    if (!joinedOrg) return null

    const { node: org, membership } = joinedOrg

    return (
        <Actionsheet {...rest}>
            <Actionsheet.Content alignItems="stretch" p={4}>
                <VStack space={3}>
                    <OrgInfoLogo org={org} />
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
                            icon={<UserJoinedOrgSheetIcon name="team" />}
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
                            icon={<UserJoinedOrgSheetIcon name="bells" />}
                            onPress={() => {}}
                            title="Notifications"
                        />
                    </VStack>
                    {membership.role === OrganizationRoleType.Owner ? (
                        <VStack>
                            <OrganizationActionItem
                                borderTopRadius={5}
                                icon={
                                    <UserJoinedOrgSheetIcon name="calendar" />
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
                                icon={<UserJoinedOrgSheetIcon name="setting" />}
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
