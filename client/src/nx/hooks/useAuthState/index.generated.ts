import * as Types from '../../graphql/schema'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ViewerQueryVariables = Types.Exact<{ [key: string]: never }>

export type ViewerQuery = {
    __typename?: 'Query'
    viewer: { __typename?: 'User'; id: string; firstName: string } | null
}

export const ViewerDocument = gql`
    query Viewer {
        viewer {
            id
            firstName
        }
    }
`

export function useViewerQuery(
    options?: Omit<Urql.UseQueryArgs<ViewerQueryVariables>, 'query'>
) {
    return Urql.useQuery<ViewerQuery>({ query: ViewerDocument, ...options })
}
