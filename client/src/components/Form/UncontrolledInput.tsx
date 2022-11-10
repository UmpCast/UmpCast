import { Input, IInputProps } from 'native-base'

export default function UncontrolledInput(props: IInputProps) {
    return (
        <Input
            _focus={{
                borderWidth: 0,
                borderColor: 'primary.solid'
            }}
            _invalid={{
                borderWidth: 1,
                borderColor: 'danger.solid',
            }}
            borderWidth={1}
            borderColor="secondary.bg"
            backgroundColor="secondary.lite"
            focusOutlineColor="primary.solid"
            invalidOutlineColor="danger.solid"
            p={3}
            color="secondary.solid"
            placeholderTextColor="secondary.mute"
            rounded="sm"
            size="lg"
            {...props}
        />
    )
}
