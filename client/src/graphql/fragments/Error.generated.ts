/* eslint-disable */
import * as Types from '../../mock/schema.generated'

import gql from 'graphql-tag'
export type ErrorFragmentFragment = { __typename?: 'InputError'; key: string; message: string }

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on InputError {
        key
        message
    }
`
