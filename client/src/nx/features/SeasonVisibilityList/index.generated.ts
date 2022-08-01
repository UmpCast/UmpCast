import * as Types from '../../graphql/schema'

import gql from 'graphql-tag'
export type SeasonVisibilityListFragment = {
    __typename?: 'SeasonParticipationPermit'
    id: string
    visibility: Array<{
        __typename?: 'PositionVisibility'
        visible: boolean
        position: {
            __typename?: 'Position'
            id: string
            name: string
            division: { __typename?: 'Division'; id: string; name: string }
        }
    }>
}

export const SeasonVisibilityListFragmentDoc = gql`
    fragment SeasonVisibilityList on SeasonParticipationPermit {
        id
        visibility {
            position {
                id
                name
                division {
                    id
                    name
                }
            }
            visible
        }
    }
`
