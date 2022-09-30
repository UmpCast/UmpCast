/* eslint-disable */
import * as Types from '../../mock/schema.generated'

import gql from 'graphql-tag'
export type UserAvatarFragment = {
    __typename?: 'User'
    id: string
    profilePictureUrl?: string | null
}

export const UserAvatarFragmentDoc = gql`
    fragment UserAvatar on User {
        id
        profilePictureUrl
    }
`
