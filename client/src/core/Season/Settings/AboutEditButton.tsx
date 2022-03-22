import { IButtonProps, Button } from 'native-base'

export default function SeasonSettingsAboutEditButton(props: IButtonProps) {
    return (
        <Button variant="ghost" colorScheme="indigo" py={0.5} m={0} {...props}>
            Edit
        </Button>
    )
}
