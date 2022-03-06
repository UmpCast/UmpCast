import { Reducer, useReducer } from 'react'

import {
    SeasonMemberAddScreen_StatusFragment,
    SeasonPermission
} from '@/generated'
import { SeasonMemberAddPendingBatch } from '../model'

type SeasonMemberAddPendingBatchAction =
    | { type: 'initialize'; statuses: SeasonMemberAddScreen_StatusFragment[] }
    | {
          type: 'permission.toggle'
          userId: string
          permission: SeasonPermission
      }

export default function useSeasonMemberAddPendingBatch() {
    return useReducer<
        Reducer<SeasonMemberAddPendingBatch, SeasonMemberAddPendingBatchAction>
    >((batch, action) => {
        switch (action.type) {
            case 'initialize': {
                return action.statuses.map((status) => {
                    return {
                        [SeasonPermission.Referee]: false,
                        [SeasonPermission.Manager]: false,
                        status
                    }
                })
            }
            case 'permission.toggle': {
                return batch.map((pending) => {
                    const { status } = pending
                    if (status.permit.user.id !== action.userId) return pending

                    return {
                        ...pending,
                        [action.permission]: !pending[action.permission]
                    }
                })
            }
            default:
                return batch
        }
    }, [])
}
