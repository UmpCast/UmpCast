import { IInputProps, Input } from 'native-base'
import { ControllerRenderProps } from 'react-hook-form'

export interface HFInputProps extends IInputProps {
    field: ControllerRenderProps<any, any>
}

export default function HFInput({
    field: { onChange, ...field },
    ...rest
}: HFInputProps) {
    return (
        <Input
            testID={`${field.name}-input`}
            onChangeText={onChange}
            {...field}
            {...rest}
        />
    )
}
