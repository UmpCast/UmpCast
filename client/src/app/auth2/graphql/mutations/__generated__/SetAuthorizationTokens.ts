/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SetAuthorizationTokens
// ====================================================

export interface SetAuthorizationTokens_authorization {
  __typename: "Authorization";
  refreshToken: string;
  accessToken: string;
}

export interface SetAuthorizationTokens {
  authorization: SetAuthorizationTokens_authorization;
}
