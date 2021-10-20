/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GetFreshAccessToken
// ====================================================

export interface GetFreshAccessToken_refreshToken {
  token: string;
}

export interface GetFreshAccessToken {
  refreshToken: GetFreshAccessToken_refreshToken | null;
}

export interface GetFreshAccessTokenVariables {
  refreshToken?: string | null;
}
