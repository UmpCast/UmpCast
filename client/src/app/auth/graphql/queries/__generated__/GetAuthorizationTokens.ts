/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAuthorizationTokens
// ====================================================

export interface GetAuthorizationTokens_authorization {
  __typename: "Authorization";
  refreshToken: string;
  accessToken: string;
}

export interface GetAuthorizationTokens {
  authorization: GetAuthorizationTokens_authorization;
}
