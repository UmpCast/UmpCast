/* eslint-disable */
import * as Types from '../../graphql/schema'

import gql from 'graphql-tag'
export type PositionTitle_PositionFragment = { __typename?: 'Position'; id: string; name: string }

export type PositionTitle_DivisionFragment = { __typename?: 'Division'; id: string; name: string }

export const PositionTitle_PositionFragmentDoc = gql`
    fragment PositionTitle_Position on Position {
        id
        name
    }
`
export const PositionTitle_DivisionFragmentDoc = gql`
    fragment PositionTitle_Division on Division {
        id
        name
    }
`
