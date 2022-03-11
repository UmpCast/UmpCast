import { Reducer, useReducer } from 'react'

import { SeasonMemberAddScreen_OrganizationMemberPermitFragment } from '@/generated'

import { SeasonMemberAddRequest, SeasonRole } from '../model'

type SeasonMemberAddRequestsAction<TOrganizationMemberPermit> =
    | {
          type: 'initialize'
          members: TOrganizationMemberPermit[]
      }
    | {
          type: 'permission.toggle'
          userId: string
          role: SeasonRole
      }

export default function useSeasonMemberAddRequests<
    TOrganizationMemberPermit extends SeasonMemberAddScreen_OrganizationMemberPermitFragment
>() {
    return useReducer<
        Reducer<
            SeasonMemberAddRequest[],
            SeasonMemberAddRequestsAction<TOrganizationMemberPermit>
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
                    const { member } = request
                    if (member.user.id !== action.userId) return request

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
