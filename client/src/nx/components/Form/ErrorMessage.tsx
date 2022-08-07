import { IFormControlErrorMessageProps, Text, HStack } from 'native-base'
import { useContext } from 'react'

import MaterialIcon from '../MaterialIcon'

import { FieldContext } from './FieldContext'

export interface ErrorMessageProps extends IFormControlErrorMessageProps {}

export default function FormErrorMessage() {
    const { fieldState } = useContext(FieldContext)

    const message = fieldState.error?.message

    if (!message) {
        return null
    }

    return (
        <HStack alignItems="center" space={1}>
            <MaterialIcon
                color="danger.base"
                name="alert-circle-outline"
                size="sm"
            />
            <Text bold color="danger.base" fontSize="sm">
                {message}
            </Text>
        </HStack>
    )
}
