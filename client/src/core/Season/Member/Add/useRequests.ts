import { Reducer, useReducer } from 'react'

import {
    SeasonMemberAddScreen_StatusFragment,
    SeasonPermission
} from '@/generated'

import { SeasonMemberAddRequest } from '../model'

type SeasonMemberAddRequestsAction =
    | { type: 'initialize'; statuses: SeasonMemberAddScreen_StatusFragment[] }
    | {
          type: 'permission.toggle'
          userId: string
          permission: SeasonPermission
      }

export default function useSeasonMemberAddRequests() {
    return useReducer<
        Reducer<SeasonMemberAddRequest[], SeasonMemberAddRequestsAction>
    >((requests, action) => {
        switch (action.type) {
            case 'initialize': {
                return action.statuses.map((status) => ({
                    [SeasonPermission.Referee]: false,
                    [SeasonPermission.Manager]: false,
                    status
                }))
            }
            case 'permission.toggle': {
                return requests.map((request) => {
                    const { status } = request
                    if (status.permit.user.id !== action.userId) return request

                    return {
                        ...request,
                        [action.permission]: !request[action.permission]
                    }
                })
            }
            default:
                return requests
        }
    }, [])
}
