import { VStack } from 'native-base'

import { OrgInfoListFragment, OrgInfoSheetFragment } from '@/generated'

import OrgInfoItem from './Item'

export interface OrgInfoListProps {
    permitList: OrgInfoListFragment[]
    onItemPress: (permit: OrgInfoSheetFragment) => void
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
