/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOwnedOrganizations
// ====================================================

export interface GetOwnedOrganizations_me_ownedOrganizationList {
    id: string
    name: string
}

export interface GetOwnedOrganizations_me {
    id: string
    ownedOrganizationList: GetOwnedOrganizations_me_ownedOrganizationList[]
}

export interface GetOwnedOrganizations {
    me: GetOwnedOrganizations_me | null
}
