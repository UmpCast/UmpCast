/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RefreshAccessToken
// ====================================================

export interface RefreshAccessToken_refreshToken {
  token: string;
  payload: any;
}

export interface RefreshAccessToken {
  refreshToken: RefreshAccessToken_refreshToken | null;
}

export interface RefreshAccessTokenVariables {
  refreshToken?: string | null;
}
