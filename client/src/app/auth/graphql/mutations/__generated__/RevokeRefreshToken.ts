/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RevokeRefreshToken
// ====================================================

export interface RevokeRefreshToken_revokeToken {
  revoked: number;
}

export interface RevokeRefreshToken {
  revokeToken: RevokeRefreshToken_revokeToken | null;
}

export interface RevokeRefreshTokenVariables {
  refreshToken: string;
}
