import { IInputProps, TextArea } from 'native-base'
import { ControllerRenderProps } from 'react-hook-form'

export interface HFTextAreaProps extends IInputProps {
    field: ControllerRenderProps<any, any>
    totalLines: number
}

export default function HFTextArea({
    field: { onChange, ...field },
    ...rest
}: HFTextAreaProps) {
    return (
        <TextArea
            onChangeText={onChange}
            testID={`${field.name}-input`}
            {...field}
            {...rest}
        />
    )
}
