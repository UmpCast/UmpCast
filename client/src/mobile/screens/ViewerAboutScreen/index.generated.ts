/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { UserAvatarFragmentDoc } from '../../../features/UserAvatar/index.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ScreenQueryVariables = Types.Exact<{ [key: string]: never }>

export type ScreenQuery = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        id: string
        firstName: string
        lastName: string
        phoneNumber?: string | null
        fullAddress?: string | null
        profilePictureUrl?: string | null
    }
}

export const ScreenDocument = gql`
    query Screen {
        viewer {
            id
            firstName
            lastName
            ...UserAvatar
            phoneNumber
            fullAddress
        }
    }
    ${UserAvatarFragmentDoc}
`

export function useScreenQuery(options?: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>) {
    return Urql.useQuery<ScreenQuery>({ query: ScreenDocument, ...options })
}
