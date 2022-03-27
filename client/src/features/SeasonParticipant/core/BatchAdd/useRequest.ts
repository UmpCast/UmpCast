import { Reducer, useReducer } from 'react'

import { SeasonParticipantAddRequest } from '@/features/SeasonParticipant/model'
import {
    SeasonParticipantsAddScreen_OrganizationMemberEdgeFragment,
    SeasonRoleType
} from '@/generated'

type SeasonParticipantAddRequestsAction<TOrganizationMember> =
    | {
          type: 'initialize'
          members: TOrganizationMember[]
      }
    | {
          type: 'permission.toggle'
          userId: string
          role: SeasonRoleType
      }

export default function useSeasonParticipantAddRequests<
    TOrganizationMember extends SeasonParticipantsAddScreen_OrganizationMemberEdgeFragment
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
                    pendingRoles: {
                        [SeasonRoleType.Manager]: false,
                        [SeasonRoleType.Referee]: false
                    },
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
                        pendingRoles: {
                            ...request.pendingRoles,
                            [action.role]: !request.pendingRoles[action.role]
                        }
                    }
                })
            }
            default:
                return requests
        }
    }, [])
}
