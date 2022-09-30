/* eslint-disable */
import * as Types from '../../mock/schema.generated'

import gql from 'graphql-tag'
import { UserAvatarFragmentDoc } from '../UserAvatar/index.generated'
export type UserItemFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    lastName: string
    profilePictureUrl?: string | null
}

export const UserItemFragmentDoc = gql`
    fragment UserItem on User {
        id
        firstName
        lastName
        ...UserAvatar
    }
    ${UserAvatarFragmentDoc}
`
