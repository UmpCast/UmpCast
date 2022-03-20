import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Box, Heading, Icon, useDisclose, VStack } from 'native-base'
import { useState } from 'react'

import {
    OrganizationRoleType,
    OrgInfoSheet_UserJoinedOrganizationEdgeFragment,
    useUserJoinedOrgInfoScreenQuery
} from '@/generated'

import { UserJoinedOrgListItemButton } from './ItemButton'
import UserJoinedOrgListSelectedSheet from './SelectedSheet'
import UserJoinedOrgListItem from './Item'
import { AppRootStackRoute } from '@/core/App/Root/Stack'
import UserJoinOrgModal from '@/core/User/JoinOrg/Modal'
import {
    UserGroupsTopTabScreenProps,
    UserGroupsTopTabRoute
} from '@/core/User/Groups/TopTab'

export default function UserJoinedOrgInfoScreen() {
    const { navigate } =
        useNavigation<
            UserGroupsTopTabScreenProps<UserGroupsTopTabRoute.Org>['navigation']
        >()
    const [{ data }] = useUserJoinedOrgInfoScreenQuery()

    const [selectedOrg, setSelectedOrg] =
        useState<null | OrgInfoSheet_UserJoinedOrganizationEdgeFragment>(null)
    const orgInfoSheetDisclose = useDisclose()
    const orgMemberJoinModalDisclose = useDisclose()

    const joinedOrgs = data?.viewer?.organizations ?? []
    const memberOrgs = joinedOrgs.filter(
        ({ membership }) => membership.role === OrganizationRoleType.Member
    )
    const ownerOrgs = joinedOrgs.filter(
        ({ membership }) => membership.role === OrganizationRoleType.Owner
    )

    const onUserJoinedOrgItemPress = (
        joinedOrg: OrgInfoSheet_UserJoinedOrganizationEdgeFragment
    ) => {
        setSelectedOrg(joinedOrg)
        orgMemberJoinModalDisclose.onOpen()
    }

    return (
        <Box p={4}>
            <VStack space={4}>
                <Heading size="sm">Member</Heading>
                <VStack space={3}>
                    {memberOrgs.map((joinedOrg) => {
                        const { node: org } = joinedOrg

                        return (
                            <UserJoinedOrgListItem
                                key={org.id}
                                onPress={() =>
                                    onUserJoinedOrgItemPress(joinedOrg)
                                }
                                org={org}
                            />
                        )
                    })}
                    <UserJoinedOrgListItemButton
                        name="Join Organization"
                        onPress={orgMemberJoinModalDisclose.onOpen}
                        source={
                            <Icon
                                as={AntDesign}
                                color="indigo.500"
                                name="plus"
                            />
                        }
                    />
                </VStack>
                <Heading size="sm">Owner</Heading>
                <VStack space={3}>
                    {ownerOrgs.map((joinedOrg) => {
                        const { node: org } = joinedOrg

                        return (
                            <UserJoinedOrgListItem
                                key={org.id}
                                onPress={() =>
                                    onUserJoinedOrgItemPress(joinedOrg)
                                }
                                org={org}
                            />
                        )
                    })}
                    <UserJoinedOrgListItemButton
                        name="Create Organization"
                        onPress={() => navigate(AppRootStackRoute.OrgCreate)}
                        source={
                            <Icon
                                as={AntDesign}
                                color="indigo.500"
                                name="plus"
                            />
                        }
                    />
                </VStack>
            </VStack>
            <UserJoinOrgModal
                {...orgMemberJoinModalDisclose}
                testID="UserJoinOrgModal"
            />
            <UserJoinedOrgListSelectedSheet
                hideDragIndicator
                {...orgInfoSheetDisclose}
                joinedOrg={selectedOrg}
                testID="UserJoinedOrgSheet"
            />
        </Box>
    )
}
