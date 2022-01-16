import { Input, IInputProps } from 'native-base'
import { ControllerRenderProps } from 'react-hook-form'

export interface NBInputProps extends IInputProps {
    field: ControllerRenderProps<any, any>
}

export default function NBInput({ field, ...rest }: NBInputProps) {
    return (
        <Input
            testID={`${field.name}-input`}
            onChangeText={field.onChange}
            value={field.value}
            {...rest}
        />
    )
}
