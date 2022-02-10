import { OrgInfoListFragment, useOrgJoinedScreenQuery } from '@/generated'
import OrgInfoList from '../Info/List'

export default function OrgJoinedScreen() {
    const [{ data }] = useOrgJoinedScreenQuery()

    const permitList = data?.me?.organizationPermitList
    if (!permitList) return null

    const filteredPermitList = permitList.filter(
        (permit): permit is OrgInfoListFragment => permit !== null
    )

    return <OrgInfoList permitList={filteredPermitList} />
}
