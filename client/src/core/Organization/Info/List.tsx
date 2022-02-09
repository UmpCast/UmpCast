import { OrganizationPermissionLevel, OrgInfoListFragment } from '@/generated'
import { Heading, VStack } from 'native-base'
import OrgInfoItem from './Item'

export interface OrgInfoListProps {
    permitList: OrgInfoListFragment[]
}

export default function OrgInfoList({ permitList }: OrgInfoListProps) {
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
                        onPress={() => {}}
                    />
                )
            })
    }

    return (
        <VStack space={4}>
            <Heading size="xs" color="indigo.500">
                MEMBER
            </Heading>
            {renderOrganizationList(OrganizationPermissionLevel.Member)}
            <Heading size="xs" color="indigo.500">
                OWNER
            </Heading>
            {renderOrganizationList(OrganizationPermissionLevel.Owner)}
        </VStack>
    )
}
