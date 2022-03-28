import { Button } from 'native-base'

import { SeasonParticipantAddRequest } from '@/features/SeasonParticipant/model'
import {
    SeasonRoleType,
    useSeasonParticipantBatchAddMutation
} from '@/generated'

export interface SeasonParticipantAddSaveButtonProps {
    pendingRequests: SeasonParticipantAddRequest[]
    seasonId: string
    onAdd: () => any
}

const prepareBatch = (pendingRequests: SeasonParticipantAddRequest[]) =>
    pendingRequests
        .map((request) => {
            const {
                member: { node: user },
                pendingRoles
            } = request

            const roles = []
            if (pendingRoles.REFEREE) roles.push(SeasonRoleType.Referee)
            if (pendingRoles.MANAGER) roles.push(SeasonRoleType.Manager)

            return {
                userId: user.id,
                roles
            }
        })
        .filter((request) => request.roles.length > 0)

export default function SeasonParticipantAddSaveButton({
    pendingRequests,
    seasonId,
    onAdd
}: SeasonParticipantAddSaveButtonProps) {
    const [_, addMembers] = useSeasonParticipantBatchAddMutation()
    const preparedRequests = prepareBatch(pendingRequests)

    const disabled = preparedRequests.length === 0

    return (
        <Button
            _text={{
                color: disabled ? 'blueGray.300' : undefined
            }}
            colorScheme="indigo"
            disabled={disabled}
            onPress={async () => {
                await addMembers({
                    input: {
                        seasonId,
                        requests: preparedRequests
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
