import {
    OrganizationPermissionLevel,
    useUserJoinedOrgListQuery
} from '@/generated'
import { Heading, VStack } from 'native-base'
import OrganizationListItem from '../../Organization/Info/Item'

export default function UserJoinedOrgList() {
    const [{ data }] = useUserJoinedOrgListQuery()

    const renderOrganizationList = (level: OrganizationPermissionLevel) => {
        return data?.me?.organizationPermitList
            ?.filter((permit) => permit?.permissionLevel === level)
            .map((permit) => {
                if (!permit) return null

                const { organization } = permit
                const { id } = organization

                return (
                    <OrganizationListItem
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
