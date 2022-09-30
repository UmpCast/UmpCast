/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ScreenQueryVariables = Types.Exact<{
    seasonId: Types.Scalars['ID']
}>

export type ScreenQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        divisions: Array<{
            __typename?: 'Division'
            id: string
            name: string
            positions: Array<{ __typename?: 'Position'; id: string; name: string }>
        }>
    }
}

export const ScreenDocument = gql`
    query Screen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            divisions {
                id
                name
                positions {
                    id
                    name
                }
            }
        }
    }
`

export function useScreenQuery(options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>) {
    return Urql.useQuery<ScreenQuery>({ query: ScreenDocument, ...options })
}
