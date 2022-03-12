import { Box, Heading, useDisclose, VStack } from 'native-base'
import { useState } from 'react'

import {
    OrganizationRoleType,
    OrgInfoList_UserJoinedOrganizationEdgeFragment,
    OrgInfoSheet_UserJoinedOrganizationEdgeFragment,
    useUserOrgScreenQuery
} from '@/generated'

import OrgCreateItem from '../../Org/Create/Item'
import OrgInfoList from '../../Org/Info/List'
import OrgInfoSheet from '../../Org/Info/Sheet'
import OrgJoinItem from '../../Org/Member/Join/Item'

export default function UserOrgScreen() {
    const [{ data }] = useUserOrgScreenQuery()

    const sheetState = useDisclose()
    const [selectedOrg, setSelectedOrg] =
        useState<null | OrgInfoSheet_UserJoinedOrganizationEdgeFragment>(null)

    const orgs = data?.viewer?.organizations
    if (!orgs) return null

    const [memberPermitList, ownerPermitList] = [
        OrganizationRoleType.Member,
        OrganizationRoleType.Owner
    ].map((role) =>
        orgs.filter(
            (org): org is OrgInfoList_UserJoinedOrganizationEdgeFragment => {
                const { membership } = org
                return membership.role === role
            }
        )
    )

    const onItemPress = (
        joinedOrg: OrgInfoSheet_UserJoinedOrganizationEdgeFragment
    ) => {
        setSelectedOrg(joinedOrg)
        sheetState.onOpen()
    }

    return (
        <Box p={4}>
            <VStack space={4}>
                <Heading size="sm">Member</Heading>
                <OrgInfoList
                    onItemPress={onItemPress}
                    joinedOrgs={memberPermitList}
                />
                <OrgJoinItem />
                <Heading size="sm">Owner</Heading>
                <OrgInfoList
                    onItemPress={onItemPress}
                    joinedOrgs={ownerPermitList}
                />
                <OrgCreateItem />
            </VStack>
            <OrgInfoSheet {...sheetState} joinedOrg={selectedOrg} />
        </Box>
    )
}
