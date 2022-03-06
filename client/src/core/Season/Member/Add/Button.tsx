import { Button } from 'native-base'

import {
    SeasonPermission,
    useBatchAddMemberToSeasonMutation
} from '@/generated'

import { BatchPendingPermissions } from './usePendingPermissions'

export interface SeasonMemberAddButtonProps {
    pendingBatch: BatchPendingPermissions
    seasonId: string
    onBatchAddMemberToSeason: () => any
}

const preparePermissionBatch = (pendingBatch: BatchPendingPermissions) =>
    Object.entries(pendingBatch)
        .filter((operation): operation is [string, SeasonPermission[]] => {
            const [_, permissions] = operation
            return permissions !== undefined && permissions.length > 0
        })
        .map(([userId, permissions]) => ({
            userId,
            permissionList: permissions
        }))

export default function SeasonMemberAddButton({
    pendingBatch,
    seasonId,
    onBatchAddMemberToSeason
}: SeasonMemberAddButtonProps) {
    const [_, batchAddMemberToSeason] = useBatchAddMemberToSeasonMutation()

    const batch = preparePermissionBatch(pendingBatch)
    const disabled = batch.length === 0

    return (
        <Button
            _text={{
                color: disabled ? 'blueGray.300' : undefined
            }}
            colorScheme="indigo"
            disabled={disabled}
            onPress={async () => {
                await batchAddMemberToSeason({
                    input: {
                        seasonId,
                        batch
                    }
                })

                onBatchAddMemberToSeason()
            }}
            variant="ghost"
        >
            Add
        </Button>
    )
}
