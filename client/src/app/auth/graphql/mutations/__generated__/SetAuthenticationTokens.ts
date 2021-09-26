/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SetAuthenticationTokens
// ====================================================

export interface SetAuthenticationTokens_authentication {
  __typename: "Authentication";
  refreshToken: string;
  accessToken: string;
}

export interface SetAuthenticationTokens {
  authentication: SetAuthenticationTokens_authentication;
}
