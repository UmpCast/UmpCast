/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetManagerOrgs
// ====================================================

export interface GetManagerOrgs_me_portals_manager_organization {
  id: string;
  name: string;
}

export interface GetManagerOrgs_me_portals_manager {
  organization: GetManagerOrgs_me_portals_manager_organization;
}

export interface GetManagerOrgs_me_portals {
  manager: (GetManagerOrgs_me_portals_manager | null)[];
}

export interface GetManagerOrgs_me {
  portals: GetManagerOrgs_me_portals;
}

export interface GetManagerOrgs {
  me: GetManagerOrgs_me | null;
}
