import gql from 'graphql-tag'
export type UserAvatarNxFragment = {
    __typename?: 'User'
    id: string
    profilePictureUrl: string | null
}

export const UserAvatarNxFragmentDoc = gql`
    fragment UserAvatarNx on User {
        id
        profilePictureUrl
    }
`
