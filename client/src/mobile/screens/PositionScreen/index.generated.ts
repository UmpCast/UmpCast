/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ScreenQueryVariables = Types.Exact<{
    positionId: Types.Scalars['ID']
}>

export type ScreenQuery = {
    __typename?: 'Query'
    position?: {
        __typename?: 'Position'
        id: string
        name: string
        division: { __typename?: 'Division'; id: string; name: string }
    } | null
}

export const ScreenDocument = gql`
    query Screen($positionId: ID!) {
        position(id: $positionId) {
            id
            name
            division {
                id
                name
            }
        }
    }
`

export function useScreenQuery(options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>) {
    return Urql.useQuery<ScreenQuery>({ query: ScreenDocument, ...options })
}
