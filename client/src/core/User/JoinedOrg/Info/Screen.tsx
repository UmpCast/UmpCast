import { Box, Heading, Icon, useDisclose, VStack } from 'native-base'
import { useState } from 'react'

import {
    OrganizationRoleType,
    OrgInfoSheet_UserJoinedOrganizationEdgeFragment,
    useUserJoinedOrgInfoScreenQuery
} from '@/generated'
import UserJoinedOrgItem from './Item'
import { UserJoinedOrgItemButton } from './ItemButton'
import { AntDesign } from '@expo/vector-icons'
import UserJoinedOrgSheet from './Sheet'
import { CompositeScreenProps, useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { StackScreenProps } from '@react-navigation/stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import OrgMemberJoinModal from '@/core/Org/Member/Join/Modal'
import {
    UserGroupTabsParamList,
    UserGroupTabsRoute
} from '@/core/User/Group/Tabs'

type ScreenProps = CompositeScreenProps<
    StackScreenProps<RootStackParamList, RootStackRoutes.Home>,
    BottomTabScreenProps<UserGroupTabsParamList, UserGroupTabsRoute.Org>
>

export default function UserJoinedOrgInfoScreen() {
    const { navigate } = useNavigation<ScreenProps['navigation']>()

    const [{ data }] = useUserJoinedOrgInfoScreenQuery()

    const orgInfoSheetDisclose = useDisclose()
    const orgMemberJoinModalDisclose = useDisclose()

    const [selectedOrg, setSelectedOrg] =
        useState<null | OrgInfoSheet_UserJoinedOrganizationEdgeFragment>(null)

    const onUserJoinedOrgItemPress = (
        joinedOrg: OrgInfoSheet_UserJoinedOrganizationEdgeFragment
    ) => {
        setSelectedOrg(joinedOrg)
        orgMemberJoinModalDisclose.onOpen()
    }

    const joinedOrgs = data?.viewer?.organizations ?? []

    const memberOrgs = joinedOrgs.filter(
        ({ membership }) => membership.role === OrganizationRoleType.Member
    )
    const ownerOrgs = joinedOrgs.filter(
        ({ membership }) => membership.role === OrganizationRoleType.Owner
    )

    return (
        <Box p={4}>
            <VStack space={4}>
                <Heading size="sm">Member</Heading>
                <VStack>
                    {memberOrgs.map((joinedOrg) => {
                        const { node: org } = joinedOrg

                        return (
                            <UserJoinedOrgItem
                                key={org.id}
                                onPress={() =>
                                    onUserJoinedOrgItemPress(joinedOrg)
                                }
                                org={org}
                            />
                        )
                    })}
                </VStack>
                <UserJoinedOrgItemButton
                    name="Join Organization"
                    onPress={orgMemberJoinModalDisclose.onOpen}
                    source={
                        <Icon as={AntDesign} color="indigo.500" name="plus" />
                    }
                />
                <Heading size="sm">Owner</Heading>
                <VStack>
                    {ownerOrgs.map((joinedOrg) => {
                        const { node: org } = joinedOrg

                        return (
                            <UserJoinedOrgItem
                                key={org.id}
                                onPress={() =>
                                    onUserJoinedOrgItemPress(joinedOrg)
                                }
                                org={org}
                            />
                        )
                    })}
                </VStack>
                <UserJoinedOrgItemButton
                    name="Create Organization"
                    onPress={() => navigate(RootStackRoutes.OrgCreate)}
                    source={
                        <Icon as={AntDesign} color="indigo.500" name="plus" />
                    }
                />
            </VStack>
            <UserJoinedOrgSheet
                hideDragIndicator
                {...orgInfoSheetDisclose}
                testID="org-info-sheet"
                joinedOrg={selectedOrg}
            />
            <OrgMemberJoinModal
                {...orgMemberJoinModalDisclose}
                testID="org-member-join-modal"
            />
        </Box>
    )
}
