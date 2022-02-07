import OrganizationPreviewItem from '@/core/Organization/Preview/Item'
import {
    OrganizationPermissionLevel,
    UserJoinedOrgListFragment
} from '@/generated'
import { Heading, VStack } from 'native-base'

export interface UserJoinedOrgList {
    permitList: UserJoinedOrgListFragment[]
}

export default function UserJoinedOrgList({ permitList }: UserJoinedOrgList) {
    const renderOrganizationList = (level: OrganizationPermissionLevel) => {
        return permitList
            .filter((permit) => permit?.permissionLevel === level)
            .map((permit) => {
                if (!permit) return null

                const { organization } = permit
                const { id } = organization

                return (
                    <OrganizationPreviewItem
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
