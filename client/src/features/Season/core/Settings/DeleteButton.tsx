import { Text, Button, IButtonProps, useDisclose } from 'native-base'

import ConfirmationSimpleModal from '@/components/Confirmation/SimpleModal'
import {
    SeasonSettingsDeleteButton_SeasonFragment,
    useDeleteSeasonMutation
} from '@/generated'

export interface SeasonSettingsDeleteButtonProps extends IButtonProps {
    season: SeasonSettingsDeleteButton_SeasonFragment
    onSuccess: () => any
}

export default function SeasonSettingsDeleteButton({
    season,
    onSuccess,
    ...rest
}: SeasonSettingsDeleteButtonProps) {
    const { name, id } = season

    const disclose = useDisclose()
    const [_, execute] = useDeleteSeasonMutation()

    const onConfirmPress = async () => {
        await execute({
            input: {
                seasonId: id
            }
        })

        disclose.onClose()

        await onSuccess()
    }

    return (
        <>
            <Button
                colorScheme="indigo"
                onPress={disclose.onOpen}
                variant="subtle"
                {...rest}
            >
                Delete Season
            </Button>
            <ConfirmationSimpleModal
                {...disclose}
                description={
                    <Text>
                        Are you sure you want to delete <Text bold>{name}</Text>
                        ?
                    </Text>
                }
                onConfirmPress={onConfirmPress}
                title="Delete Season"
            />
        </>
    )
}
