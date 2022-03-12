import { VStack } from 'native-base'

import { OrgInfoList_UserJoinedOrganizationEdgeFragment } from '@/generated'

import OrgInfoItem from './Item'

export interface OrgInfoListProps {
    joinedOrgs: OrgInfoList_UserJoinedOrganizationEdgeFragment[]
    onItemPress: (
        joinedOrg: OrgInfoList_UserJoinedOrganizationEdgeFragment
    ) => void
}

export default function OrgInfoList({
    joinedOrgs,
    onItemPress
}: OrgInfoListProps) {
    return (
        <VStack>
            {joinedOrgs.map((joinedOrg) => {
                const { node: org } = joinedOrg

                return (
                    <OrgInfoItem
                        key={org.id}
                        onPress={() => onItemPress(joinedOrg)}
                        org={org}
                    />
                )
            })}
        </VStack>
    )
}
