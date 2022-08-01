import * as Types from '../../graphql/schema'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ViewerInfoQueryVariables = Types.Exact<{ [key: string]: never }>

export type ViewerInfoQuery = {
    __typename?: 'Query'
    viewer: { __typename?: 'User'; id: string; firstName: string } | null
}

export const ViewerInfoDocument = gql`
    query ViewerInfo {
        viewer {
            id
            firstName
        }
    }
`

export function useViewerInfoQuery(
    options?: Omit<Urql.UseQueryArgs<ViewerInfoQueryVariables>, 'query'>
) {
    return Urql.useQuery<ViewerInfoQuery>({
        query: ViewerInfoDocument,
        ...options
    })
}
