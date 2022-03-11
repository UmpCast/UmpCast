import { VStack } from 'native-base'

import { OrgInfoList_OrganizationMemberPermitFragment } from '@/generated'

import OrgInfoItem from './Item'

export interface OrgInfoListProps {
    permitList: OrgInfoList_OrganizationMemberPermitFragment[]
    onItemPress: (permit: OrgInfoList_OrganizationMemberPermitFragment) => void
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
