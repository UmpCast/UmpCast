/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetManagerOrganizations
// ====================================================

export interface GetManagerOrganizations_me_portals_manager_organization {
  id: string;
  name: string;
}

export interface GetManagerOrganizations_me_portals_manager {
  organization: GetManagerOrganizations_me_portals_manager_organization;
}

export interface GetManagerOrganizations_me_portals {
  manager: (GetManagerOrganizations_me_portals_manager | null)[];
}

export interface GetManagerOrganizations_me {
  portals: GetManagerOrganizations_me_portals;
}

export interface GetManagerOrganizations {
  me: GetManagerOrganizations_me | null;
}
