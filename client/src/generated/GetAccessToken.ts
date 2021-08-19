/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GetAccessToken
// ====================================================

export interface GetAccessToken_refreshToken {
  token: string;
  payload: any;
}

export interface GetAccessToken {
  refreshToken: GetAccessToken_refreshToken | null;
}

export interface GetAccessTokenVariables {
  refreshToken?: string | null;
}
