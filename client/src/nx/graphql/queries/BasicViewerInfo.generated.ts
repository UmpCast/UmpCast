/* eslint-disable */
import * as Types from '../schema'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type BasicViewerInfoQueryVariables = Types.Exact<{ [key: string]: never }>

export type BasicViewerInfoQuery = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        id: string
        firstName: string
        lastName: string
        email: string
        profilePictureUrl: string | null
    } | null
}

export const BasicViewerInfoDocument = gql`
    query BasicViewerInfo {
        viewer {
            id
            firstName
            lastName
            email
            profilePictureUrl
        }
    }
`

export function useBasicViewerInfoQuery(
    options?: Omit<Urql.UseQueryArgs<BasicViewerInfoQueryVariables>, 'query'>
) {
    return Urql.useQuery<BasicViewerInfoQuery>({ query: BasicViewerInfoDocument, ...options })
}
