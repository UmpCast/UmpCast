import {
    OrganizationPermissionLevel,
    OrgInfoListFragment,
    OrgInfoSheetFragment,
    useOrgJoinedScreenQuery
} from '@/generated'
import { Heading, useDisclose, VStack } from 'native-base'
import { useState } from 'react'
import OrgCreateItem from '../Create/Item'
import OrgInfoList from '../Info/List'
import OrgInfoSheet from '../Info/Sheet'
import OrgJoinItem from '../Join/Item'

export default function OrgJoinedScreen() {
    const [{ data }] = useOrgJoinedScreenQuery()

    const sheetState = useDisclose()
    const [selectedPermit, setSelectedPermit] =
        useState<null | OrgInfoSheetFragment>(null)

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

    const onItemPress = (permit: OrgInfoSheetFragment) => {
        setSelectedPermit(permit)
        sheetState.onOpen()
    }

    return (
        <>
            <VStack space={4}>
                <Heading size="xs" color="indigo.500">
                    MEMBER
                </Heading>
                <OrgInfoList
                    permitList={memberPermitList}
                    onItemPress={onItemPress}
                />
                <OrgJoinItem />
                <Heading size="xs" color="indigo.500">
                    OWNER
                </Heading>
                <OrgInfoList
                    permitList={ownerPermitList}
                    onItemPress={onItemPress}
                />
                <OrgCreateItem />
            </VStack>
            <OrgInfoSheet {...sheetState} permit={selectedPermit} />
        </>
    )
}
