import { useViewerInfoQuery } from './index.generated'
import { useAuthStateQuery } from '@/graphql/generated'

export default function useViewerInfo() {
    const [{ data }] = useViewerInfoQuery()

    return data?.viewer
}
