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
            testID={`${field.name}-input`}
            onChangeText={onChange}
            {...field}
            {...rest}
        />
    )
}
