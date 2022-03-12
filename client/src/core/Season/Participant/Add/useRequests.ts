import { Reducer, useReducer } from 'react'

import { SeasonParticipantAddScreen_OrganizationMemberEdgeFragment } from '@/generated'

import { SeasonParticipantAddRequest, SeasonRole } from '../model'

type SeasonParticipantAddRequestsAction<TOrganizationMember> =
    | {
          type: 'initialize'
          members: TOrganizationMember[]
      }
    | {
          type: 'permission.toggle'
          userId: string
          role: SeasonRole
      }

export default function useSeasonParticipantAddRequests<
    TOrganizationMember extends SeasonParticipantAddScreen_OrganizationMemberEdgeFragment
>() {
    return useReducer<
        Reducer<
            SeasonParticipantAddRequest[],
            SeasonParticipantAddRequestsAction<TOrganizationMember>
        >
    >((requests, action) => {
        switch (action.type) {
            case 'initialize': {
                return action.members.map((member) => ({
                    referee: false,
                    manager: false,
                    member
                }))
            }
            case 'permission.toggle': {
                return requests.map((request) => {
                    const {
                        member: { node: user }
                    } = request
                    if (user.id !== action.userId) return request

                    return {
                        ...request,
                        [action.role]: !request[action.role]
                    }
                })
            }
            default:
                return requests
        }
    }, [])
}
