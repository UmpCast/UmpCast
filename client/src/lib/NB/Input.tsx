import { Input, IInputProps } from 'native-base'
import { ControllerRenderProps } from 'react-hook-form'

export interface NBInputProps extends IInputProps {
    field: ControllerRenderProps<any, any>
}

export default function NBInput({ field, ...rest }: NBInputProps) {
    return (
        <Input
            onChangeText={field.onChange}
            testID={`${field.name}-input`}
            value={field.value}
            {...rest}
        />
    )
}
