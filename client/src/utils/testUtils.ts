import appCache from '@/apollo/appCache'
import { GetAuthStateQuery, GetAuthStateDocument } from '@/apollo/generated'

export const getAuthState = () => {
    const data = appCache.readQuery<GetAuthStateQuery>({
        query: GetAuthStateDocument
    })

    return data?.authState
}
