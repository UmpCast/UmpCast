import {
    IFormControlErrorMessageProps,
    FormControl,
    Text,
    ITextProps
} from 'native-base'
import { useContext } from 'react'

import { FieldContext } from './FieldContext'

export interface ErrorMessageProps extends IFormControlErrorMessageProps {}

export default function FormErrorMessage({ children, ...rest }: ITextProps) {
    const { fieldState } = useContext(FieldContext)

    return (
        <Text {...rest} fontSize="sm" color="danger.base">
            {children ?? fieldState.error?.message}
        </Text>
    )
}
