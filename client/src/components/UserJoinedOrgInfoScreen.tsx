import { AntDesign } from '@expo/vector-icons'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { Box, Heading, Icon, useDisclose, VStack } from 'native-base'
import { useState } from 'react'

import {
    OrganizationRoleType,
    OrgInfoSheet_UserJoinedOrganizationEdgeFragment,
    useUserJoinedOrgInfoScreenQuery
} from '@/generated'

import { RootStackParamList, RootStackRoutes } from './AppRootStack'
import OrgMemberJoinModal from './OrgMemberJoinModal'
import { UserGroupTabsParamList, UserGroupTabsRoute } from './UserGroupTabs'
import UserJoinedOrgItem from './UserJoinedOrgInfoItem'
import { UserJoinedOrgInfoItemButton } from './UserJoinedOrgInfoItemButton'
import UserJoinedOrgSheet from './UserJoinedOrgInfoSheet'

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
                <UserJoinedOrgInfoItemButton
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
                <UserJoinedOrgInfoItemButton
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
                joinedOrg={selectedOrg}
                testID="UserJoinedOrgSheet"
            />
            <OrgMemberJoinModal
                {...orgMemberJoinModalDisclose}
                testID="OrgMemberJoinModal"
            />
        </Box>
    )
}
