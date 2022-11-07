/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ScreenQueryVariables = Types.Exact<{
    divisionId: Types.Scalars['ID']
}>

export type ScreenQuery = {
    __typename?: 'Query'
    division: { __typename?: 'Division'; id: string; name: string }
}

export const ScreenDocument = gql`
    query Screen($divisionId: ID!) {
        division(id: $divisionId) {
            id
            name
        }
    }
`

export function useScreenQuery(
    options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<ScreenQuery, ScreenQueryVariables>({
        query: ScreenDocument,
        ...options
    })
}
