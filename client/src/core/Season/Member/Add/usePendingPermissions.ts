import { SeasonPermission } from '@/generated'
import { Reducer, useReducer } from 'react'

export type BatchPendingPermissions = {
    [key: string]: SeasonPermission[] | undefined
}

type PendingPermissionsAction =
    | { type: 'initialize'; userIds: string[] }
    | {
          type: 'permission.toggle'
          userId: string
          permission: SeasonPermission
      }

export default function usePendingPermissions() {
    return useReducer<
        Reducer<BatchPendingPermissions, PendingPermissionsAction>
    >((state, action) => {
        switch (action.type) {
            case 'initialize':
                return Object.fromEntries(
                    action.userIds.map((id): [string, SeasonPermission[]] => [
                        id,
                        []
                    ])
                )
            case 'permission.toggle':
                const permissions = state[action.userId]
                if (!permissions) return state

                const newPermissions = permissions.includes(action.permission)
                    ? permissions.filter(
                          (permission) => permission !== action.permission
                      )
                    : [...permissions, action.permission]

                return {
                    ...state,
                    [action.userId]: newPermissions
                }
        }
    }, {})
}
