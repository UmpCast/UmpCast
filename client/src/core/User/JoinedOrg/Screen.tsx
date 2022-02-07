import {
    UserJoinedOrgListFragment,
    useUserJoinedOrgScreenQuery
} from '@/generated'
import UserJoinedOrgList from './List'

export default function UserJoinedOrgScreen() {
    const [{ data }] = useUserJoinedOrgScreenQuery()

    const permitList = data?.me?.organizationPermitList
    if (!permitList) return null

    const filteredPermitList = permitList.filter(
        (permit): permit is UserJoinedOrgListFragment => permit !== null
    )

    return <UserJoinedOrgList permitList={filteredPermitList} />
}
