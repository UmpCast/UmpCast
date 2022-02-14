import { ITextAreaProps, TextArea } from 'native-base'
import { ControllerRenderProps } from 'react-hook-form'

export interface HFTextAreaProps extends ITextAreaProps {
    field: ControllerRenderProps<any, any>
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
