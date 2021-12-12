/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SocialAuth
// ====================================================

export interface SocialAuth_socialAuth {
    token: string
    refreshToken: string
}

export interface SocialAuth {
    socialAuth: SocialAuth_socialAuth | null
}

export interface SocialAuthVariables {
    provider: string
    accessToken: string
}
