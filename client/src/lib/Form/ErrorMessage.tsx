import { IFormControlErrorMessageProps, FormControl } from 'native-base'
import { useContext } from 'react'
import { FieldContext } from './FieldContext'

export interface ErrorMessageProps extends IFormControlErrorMessageProps {}

export default function ErrorMessage(props: ErrorMessageProps) {
    const { field, fieldState } = useContext(FieldContext)

    return (
        <FormControl.ErrorMessage testID={`${field.name}-error`} {...props}>
            {fieldState.error?.message}
        </FormControl.ErrorMessage>
    )
}
