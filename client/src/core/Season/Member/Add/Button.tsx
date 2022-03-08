import { Button, IButtonProps } from 'native-base'

export default function SeasonMemberAddButton(props: IButtonProps) {
    return (
        <Button colorScheme="indigo" variant="ghost" {...props}>
            Add
        </Button>
    )
}
