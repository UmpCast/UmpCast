import { ComponentID } from '@/testing/testID'
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
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            testID={`${ComponentID.FORM_INPUT}:${field.name}`}
            value={field.value}
            {...props}
        />
    )
}
