/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationCreateMutationTypeInput } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateOrganization
// ====================================================

export interface CreateOrganization_createOrganization {
  name: string;
  id: string;
}

export interface CreateOrganization {
  createOrganization: CreateOrganization_createOrganization | null;
}

export interface CreateOrganizationVariables {
  input: OrganizationCreateMutationTypeInput;
}
