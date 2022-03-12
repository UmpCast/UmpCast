import { VStack } from 'native-base'

import { OrgInfoList_OrganizationMemberFragment } from '@/generated'

import OrgInfoItem from './Item'

export interface OrgInfoListProps {
    permitList: OrgInfoList_OrganizationMemberFragment[]
    onItemPress: (permit: OrgInfoList_OrganizationMemberFragment) => void
}

export default function OrgInfoList({
    permitList,
    onItemPress
}: OrgInfoListProps) {
    return (
        <VStack>
            {permitList.map((permit) => {
                if (!permit) return null

                const { organization } = permit
                const { id } = organization

                return (
                    <OrgInfoItem
                        key={id}
                        onPress={() => onItemPress(permit)}
                        org={organization}
                    />
                )
            })}
        </VStack>
    )
}
