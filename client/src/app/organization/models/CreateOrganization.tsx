import { CreateOrganizationVariables } from '../graphql/mutations/__generated__/CreateOrganization'

export type CreateOrganizationFormInput = Omit<
    CreateOrganizationVariables['input'],
    'owner'
>
