/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationCreateMutationTypeInput } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddOrg
// ====================================================

export interface AddOrg_createOrganization {
  name: string;
  id: string;
}

export interface AddOrg {
  createOrganization: AddOrg_createOrganization | null;
}

export interface AddOrgVariables {
  input: OrganizationCreateMutationTypeInput;
}
