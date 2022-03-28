import { IButtonProps, Button } from 'native-base'

export default function SeasonSettingsAboutEditButton(props: IButtonProps) {
    return (
        <Button colorScheme="indigo" m={0} py={0.5} variant="ghost" {...props}>
            Edit
        </Button>
    )
}
