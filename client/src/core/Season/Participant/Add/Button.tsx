import { Button, IButtonProps } from 'native-base'

export default function SeasonParticipantAddButton(props: IButtonProps) {
    return (
        <Button colorScheme="indigo" variant="ghost" {...props}>
            Add
        </Button>
    )
}
