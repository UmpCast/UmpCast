import { BatchPendingPermissions } from './usePendingPermissions'
import { Button } from 'native-base'
import {
    SeasonPermission,
    useBatchAddMemberToSeasonMutation
} from '@/generated'

export interface SeasonMemberAddButtonProps {
    pendingBatch: BatchPendingPermissions
    seasonId: string
}

const preparePermissionBatch = (pendingBatch: BatchPendingPermissions) => {
    return Object.entries(pendingBatch)
        .filter((operation): operation is [string, SeasonPermission[]] => {
            const [_, permissions] = operation
            return permissions !== undefined && permissions.length > 0
        })
        .map(([userId, permissions]) => {
            return {
                userId,
                permissionList: permissions
            }
        })
}

export default function SeasonMemberAddButton({
    pendingBatch,
    seasonId
}: SeasonMemberAddButtonProps) {
    const batch = preparePermissionBatch(pendingBatch)

    const [_, batchAddMemberToSeason] = useBatchAddMemberToSeasonMutation()

    return (
        <Button
            colorScheme="indigo"
            onPress={() => {
                batchAddMemberToSeason({
                    input: {
                        seasonId,
                        batch
                    }
                })
            }}
            variant="ghost"
            disabled={batch.length === 0}
        >
            Add
        </Button>
    )
}
