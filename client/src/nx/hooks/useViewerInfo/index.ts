import { useViewerQuery } from './index.generated'

export default function useViewerInfo() {
    const [{ data }] = useViewerQuery()

    return data?.viewer
}
