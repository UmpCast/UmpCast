import { Button } from 'native-base'

import { useAddSeasonMembersMutation } from '@/generated'

import { SeasonMemberAddRequest } from '../model'

export interface SeasonMemberAddSaveButtonProps {
    pendingRequests: SeasonMemberAddRequest[]
    seasonId: string
    onAdd: () => any
}

const prepareBatch = (pendingRequests: SeasonMemberAddRequest[]) =>
    pendingRequests
        .map((request) => {
            const { user } = request.status.permit

            return {
                userId: user.id,
                referee: request.referee,
                manager: request.manager
            }
        })
        .filter((request) => request.referee || request.manager)

export default function SeasonMemberAddSaveButton({
    pendingRequests,
    seasonId,
    onAdd
}: SeasonMemberAddSaveButtonProps) {
    const [_, addMembers] = useAddSeasonMembersMutation()
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
