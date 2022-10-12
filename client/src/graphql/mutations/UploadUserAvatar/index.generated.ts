/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UploadUserAvatarMutationVariables = Types.Exact<{
    input: Types.UploadUserProfilePictureInput
}>

export type UploadUserAvatarMutation = {
    __typename?: 'Mutation'
    uploadUserProfilePicture: { __typename?: 'UploadUserProfilePicturePayload'; success: boolean }
}

export const UploadUserAvatarDocument = gql`
    mutation UploadUserAvatar($input: UploadUserProfilePictureInput!) {
        uploadUserProfilePicture(input: $input) {
            success
        }
    }
`

export function useUploadUserAvatarMutation() {
    return Urql.useMutation<UploadUserAvatarMutation, UploadUserAvatarMutationVariables>(
        UploadUserAvatarDocument
    )
}
