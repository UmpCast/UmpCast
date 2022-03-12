import { Reducer, useReducer } from 'react'

import { SeasonMemberAddScreen_OrganizationMemberEdgeFragment } from '@/generated'

import { SeasonMemberAddRequest, SeasonRole } from '../model'

type SeasonMemberAddRequestsAction<TOrganizationMember> =
    | {
          type: 'initialize'
          members: TOrganizationMember[]
      }
    | {
          type: 'permission.toggle'
          userId: string
          role: SeasonRole
      }

export default function useSeasonMemberAddRequests<
    TOrganizationMember extends SeasonMemberAddScreen_OrganizationMemberEdgeFragment
>() {
    return useReducer<
        Reducer<
            SeasonMemberAddRequest[],
            SeasonMemberAddRequestsAction<TOrganizationMember>
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
