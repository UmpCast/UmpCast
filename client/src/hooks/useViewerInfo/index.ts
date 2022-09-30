import { useBasicViewerInfoQuery } from '@/graphql/queries/BasicViewerInfo.generated'

export default function useViewerInfo() {
    const [{ data }] = useBasicViewerInfoQuery()

    return data?.viewer
}
