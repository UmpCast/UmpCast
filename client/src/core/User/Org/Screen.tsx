import { Box, Heading, useDisclose, VStack } from 'native-base'
import { useState } from 'react'

import {
    OrganizationRoleType,
    OrgInfoList_OrganizationMemberFragment,
    OrgInfoSheet_OrganizationMemberFragment,
    useUserOrgScreenQuery
} from '@/generated'

import OrgCreateItem from '../../Org/Create/Item'
import OrgInfoList from '../../Org/Info/List'
import OrgInfoSheet from '../../Org/Info/Sheet'
import OrgJoinItem from '../../Org/Member/Join/Item'

export default function UserOrgScreen() {
    const [{ data }] = useUserOrgScreenQuery()

    const sheetState = useDisclose()
    const [selectedPermit, setSelectedPermit] =
        useState<null | OrgInfoSheet_OrganizationMemberFragment>(null)

    const orgs = data?.viewer?.organizations
    if (!orgs) return null

    const [memberPermitList, ownerPermitList] = [
        OrganizationRoleType.Member,
        OrganizationRoleType.Owner
    ].map((role) =>
        orgs.filter(
            (org): org is OrgInfoList_OrganizationMemberFragment =>
                org?.role === role
        )
    )

    const onItemPress = (permit: OrgInfoSheet_OrganizationMemberFragment) => {
        setSelectedPermit(permit)
        sheetState.onOpen()
    }

    return (
        <Box p={4}>
            <VStack space={4}>
                <Heading size="sm">Member</Heading>
                <OrgInfoList
                    onItemPress={onItemPress}
                    permitList={memberPermitList}
                />
                <OrgJoinItem />
                <Heading size="sm">Owner</Heading>
                <OrgInfoList
                    onItemPress={onItemPress}
                    permitList={ownerPermitList}
                />
                <OrgCreateItem />
            </VStack>
            <OrgInfoSheet {...sheetState} permit={selectedPermit} />
        </Box>
    )
}
