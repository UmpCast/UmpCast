import {
    GetUserOrganizationListQuery,
    OrganizationPermissionLevel,
    useGetUserOrganizationListQuery
} from '@/generated'
import { Heading, VStack } from 'native-base'
import OrganizationListItem from '../../Organization/Info/Item'

type UserOrganizationPermitList = NonNullable<
    GetUserOrganizationListQuery['me']
>['organizationPermitList']

export default function UserOrganizationList() {
    const [{ data }] = useGetUserOrganizationListQuery()

    const memberPermitList = data?.me?.organizationPermitList?.filter(
        (permit) =>
            permit.permissionLevel === OrganizationPermissionLevel.Member
    )

    const ownerPermitList = data?.me?.organizationPermitList?.filter(
        (permit) => permit.permissionLevel === OrganizationPermissionLevel.Owner
    )

    const renderOrganizationList = (permitList: UserOrganizationPermitList) =>
        permitList?.map((permit) => {
            if (!permit.organization) return null
            const { title, pictureUrl, id } = permit.organization

            return (
                <OrganizationListItem
                    key={id}
                    title={title}
                    pictureUrl={pictureUrl}
                />
            )
        })

    return (
        <VStack space={4}>
            <Heading size="xs" color="indigo.500">
                MEMBER
            </Heading>
            {renderOrganizationList(memberPermitList)}
            <Heading size="xs" color="indigo.500">
                OWNER
            </Heading>
            {renderOrganizationList(ownerPermitList)}
        </VStack>
    )
}
