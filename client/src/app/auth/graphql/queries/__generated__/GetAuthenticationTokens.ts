/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAuthenticationTokens
// ====================================================

export interface GetAuthenticationTokens_authentication {
  __typename: "Authentication";
  refreshToken: string;
  accessToken: string;
}

export interface GetAuthenticationTokens {
  authentication: GetAuthenticationTokens_authentication;
}
