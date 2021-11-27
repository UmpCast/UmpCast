/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAuthentication
// ====================================================

export interface GetAuthentication_authentication {
  __typename: "Authentication";
  refreshToken: string;
  accessToken: string;
}

export interface GetAuthentication {
  authentication: GetAuthentication_authentication | null;
}
