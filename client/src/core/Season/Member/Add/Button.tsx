import { Button } from 'native-base'

import { SeasonPermission, useAddSeasonMembersMutation } from '@/generated'

import { SeasonMemberAddRequest } from '../model'

export interface SeasonMemberAddButtonProps {
    pendingRequests: SeasonMemberAddRequest[]
    seasonId: string
    onAdd: () => any
}

const prepareBatch = (pendingRequests: SeasonMemberAddRequest[]) =>
    pendingRequests
        .map((request) => {
            const { user } = request.status.permit

            const permissions = Object.values(SeasonPermission).reduce<
                SeasonPermission[]
            >(
                (prev, permission) =>
                    request[permission] ? [...prev, permission] : prev,
                []
            )

            return {
                userId: user.id,
                permissions
            }
        })
        .filter(({ permissions }) => permissions.length > 0)

export default function SeasonMemberAddButton({
    pendingRequests,
    seasonId,
    onAdd
}: SeasonMemberAddButtonProps) {
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
