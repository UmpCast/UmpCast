import { Input, IInputProps } from 'native-base'

export default function UncontrolledInput(props: IInputProps) {
    return (
        <Input
            _focus={{
                borderWidth: 0.5,
                borderColor: 'primary.solid'
            }}
            _invalid={{
                borderWidth: 0.5,
                borderColor: 'danger.solid'
            }}
            backgroundColor="secondary.lite"
            borderWidth={0}
            focusOutlineColor="primary.solid"
            invalidOutlineColor="danger.solid"
            p={3}
            placeholderTextColor="secondary.mute"
            rounded="sm"
            size="lg"
            {...props}
        />
    )
}
