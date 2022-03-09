import { Reducer, useReducer } from 'react'

import { SeasonMemberAddScreen_StatusFragment } from '@/generated'

import { SeasonMemberAddRequest, SeasonRole } from '../model'

type SeasonMemberAddRequestsAction =
    | { type: 'initialize'; statuses: SeasonMemberAddScreen_StatusFragment[] }
    | {
          type: 'permission.toggle'
          userId: string
          role: SeasonRole
      }

export default function useSeasonMemberAddRequests() {
    return useReducer<
        Reducer<SeasonMemberAddRequest[], SeasonMemberAddRequestsAction>
    >((requests, action) => {
        switch (action.type) {
            case 'initialize': {
                return action.statuses.map((status) => ({
                    referee: false,
                    manager: false,
                    status
                }))
            }
            case 'permission.toggle': {
                return requests.map((request) => {
                    const { status } = request
                    if (status.permit.user.id !== action.userId) return request

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
