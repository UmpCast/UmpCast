import { IInputProps, TextArea as NBTextArea } from 'native-base'
import { useContext } from 'react'
import { FieldContext } from './FieldContext'

export interface TextAreaProps extends IInputProps {
    totalLines: number
}

export default function TextArea(props: TextAreaProps) {
    const { field } = useContext(FieldContext)
    return (
        <NBTextArea
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            testID={`${field.name}-input`}
            {...props}
        />
    )
}
