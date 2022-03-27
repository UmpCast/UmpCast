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
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import OrgProfileLogo from '@/features/Org/core/Profile/Logo'
import { RootStackScreenProps } from '@/navigation/screenProps'
import { buildID, TestID } from '@/testing/testID'

interface OrgInfoSheetProps extends IActionsheetProps {
    joinedOrg: OrgInfoSheet_UserJoinedOrganizationEdgeFragment | null
    navigate: RootStackScreenProps['navigation']['navigate']
}

const ComponentID = buildID(TestID.COMPONENT, 'UserJoinedOrgListSelectedSheet')

export default function UserJoinedOrgListSelectedSheet({
    joinedOrg,
    navigate,
    ...rest
}: OrgInfoSheetProps) {
    const { onClose = () => {} } = rest

    if (!joinedOrg) return null

    const { node: org, membership } = joinedOrg

    return (
        <Actionsheet {...rest} testID={ComponentID}>
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
                                navigate(RootStackRoute.OrganizationMembers, {
                                    orgId: org.id
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
                                    navigate(
                                        RootStackRoute.OrganizationSeasons,
                                        {
                                            orgId: org.id
                                        }
                                    )
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
                                    navigate(
                                        RootStackRoute.OrganizationSettings,
                                        {
                                            orgId: org.id
                                        }
                                    )
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
