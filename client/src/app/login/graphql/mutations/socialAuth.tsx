import { gql, useMutation } from '@apollo/client'

import { SocialAuth, SocialAuthVariables } from './__generated__/SocialAuth'

export const SOCIAL_AUTH = gql`
    mutation SocialAuth($provider: String!, $accessToken: String!) {
        socialAuth(provider: $provider, accessToken: $accessToken) {
            token
            refreshToken
        }
    }
`

export default function useSocialAuth() {
    return useMutation<SocialAuth, SocialAuthVariables>(SOCIAL_AUTH)
}
