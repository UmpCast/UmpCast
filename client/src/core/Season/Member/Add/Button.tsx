import { Button } from 'native-base'

import {
    SeasonPermission,
    useBatchAddMemberToSeasonMutation
} from '@/generated'
import { SeasonMemberAddPendingBatch } from '../model'

export interface SeasonMemberAddButtonProps {
    pendingBatch: SeasonMemberAddPendingBatch
    seasonId: string
    onAdd: () => any
}

const prepareBatch = (pendingBatch: SeasonMemberAddPendingBatch) => {
    return pendingBatch
        .map((request) => {
            const { user } = request.status.permit

            const permissionList = Object.values(SeasonPermission).reduce<
                SeasonPermission[]
            >((prev, permission) => {
                return request[permission] ? [...prev, permission] : prev
            }, [])

            return {
                userId: user.id,
                permissionList
            }
        })
        .filter(({ permissionList }) => permissionList.length > 0)
}

export default function SeasonMemberAddButton({
    pendingBatch,
    seasonId,
    onAdd
}: SeasonMemberAddButtonProps) {
    const [_, batchAddMemberToSeason] = useBatchAddMemberToSeasonMutation()
    const preparedBatch = prepareBatch(pendingBatch)

    const disabled = preparedBatch.length === 0

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
                        batch: preparedBatch
                    }
                })

                onAdd()
            }}
            variant="ghost"
        >
            Add
        </Button>
    )
}
