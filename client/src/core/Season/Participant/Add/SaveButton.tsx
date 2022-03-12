import { Button } from 'native-base'

import { SeasonRoleType, useAddSeasonParticipantsMutation } from '@/generated'

import { SeasonParticipantAddRequest } from '../model'

export interface SeasonParticipantAddSaveButtonProps {
    pendingRequests: SeasonParticipantAddRequest[]
    seasonId: string
    onAdd: () => any
}

const prepareBatch = (pendingRequests: SeasonParticipantAddRequest[]) =>
    pendingRequests
        .map((request) => {
            const {
                member: { node: user }
            } = request

            const roles = []
            if (request.referee) roles.push(SeasonRoleType.Referee)
            if (request.manager) roles.push(SeasonRoleType.Manager)

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
    const [_, addMembers] = useAddSeasonParticipantsMutation()
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
