import {
    OrganizationPermissionLevel,
    useGetUserOrganizationListQuery
} from '@/generated'
import { Heading, VStack } from 'native-base'
import OrganizationListItem from '../../Organization/List/Item'

export default function UserOrganizationList() {
    const [{ data }] = useGetUserOrganizationListQuery()

    const memberPermitList = data?.me?.organizationPermitList?.filter(
        (permit) =>
            permit.permissionLevel === OrganizationPermissionLevel.Member
    )

    const ownerPermitList = data?.me?.organizationPermitList?.filter(
        (permit) => permit.permissionLevel === OrganizationPermissionLevel.Owner
    )

    return (
        <VStack space={4}>
            <Heading size="xs" color="indigo.500">
                MEMBER
            </Heading>
            {memberPermitList?.map((permit) => {
                if (!permit.organization) return null
                const { title, pictureUrl } = permit.organization

                return (
                    <OrganizationListItem
                        title={title}
                        pictureUrl={pictureUrl}
                    />
                )
            })}
            <Heading size="xs" color="indigo.500">
                OWNER
            </Heading>
        </VStack>
    )
}
