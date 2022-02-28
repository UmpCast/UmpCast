import { Box, Heading, useDisclose, VStack } from 'native-base'
import { useState } from 'react'

import {
    OrganizationPermissionLevel,
    OrgInfoListFragment,
    OrgInfoSheet_PermitFragment,
    useOrgJoinedScreenQuery
} from '@/generated'

import OrgCreateItem from '../Create/Item'
import OrgInfoList from '../Info/List'
import OrgInfoSheet from '../Info/Sheet'
import OrgJoinItem from '../Join/Item'

export default function OrgJoinedScreen() {
    const [{ data }] = useOrgJoinedScreenQuery()

    const sheetState = useDisclose()
    const [selectedPermit, setSelectedPermit] =
        useState<null | OrgInfoSheet_PermitFragment>(null)

    const permitList = data?.me?.organizationPermitList
    if (!permitList) return null

    const [memberPermitList, ownerPermitList] = [
        OrganizationPermissionLevel.Member,
        OrganizationPermissionLevel.Owner
    ].map((level) =>
        permitList.filter(
            (permit): permit is OrgInfoListFragment =>
                permit?.permissionLevel === level
        )
    )

    const onItemPress = (permit: OrgInfoSheet_PermitFragment) => {
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
