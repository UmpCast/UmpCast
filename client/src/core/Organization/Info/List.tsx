import {
    OrganizationPermissionLevel,
    OrgInfoListFragment,
    OrgInfoSheetFragment
} from '@/generated'
import { Heading, useDisclose, VStack } from 'native-base'
import { useState } from 'react'
import OrgJoinItem from '../Join/Item'
import OrgInfoItem from './Item'
import OrgInfoSheet from './Sheet'

export interface OrgInfoListProps {
    permitList: OrgInfoListFragment[]
}

export default function OrgInfoList({ permitList }: OrgInfoListProps) {
    const sheetState = useDisclose()
    const [selectedPermit, setSelectedPermit] =
        useState<null | OrgInfoSheetFragment>(null)

    const onItemPress = (permit: OrgInfoSheetFragment) => {
        setSelectedPermit(permit)
        sheetState.onOpen()
    }

    const renderOrganizationList = (level: OrganizationPermissionLevel) => {
        return permitList
            .filter((permit) => permit?.permissionLevel === level)
            .map((permit) => {
                if (!permit) return null

                const { organization } = permit
                const { id } = organization

                return (
                    <OrgInfoItem
                        key={id}
                        org={organization}
                        onPress={() => onItemPress(permit)}
                    />
                )
            })
    }

    return (
        <>
            <VStack space={4}>
                <Heading size="xs" color="indigo.500">
                    MEMBER
                </Heading>
                {renderOrganizationList(OrganizationPermissionLevel.Member)}
                <OrgJoinItem />
                <Heading size="xs" color="indigo.500">
                    OWNER
                </Heading>
                {renderOrganizationList(OrganizationPermissionLevel.Owner)}
            </VStack>
            <OrgInfoSheet {...sheetState} permit={selectedPermit} />
        </>
    )
}
