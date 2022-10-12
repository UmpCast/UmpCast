import { IFormControlErrorMessageProps, Text, HStack } from 'native-base'
import { useContext } from 'react'

import MaterialIcon from '../MaterialIcon'

import { FieldContext } from './FieldContext'

export interface ErrorMessageProps extends IFormControlErrorMessageProps {
    altText?: string
}

export default function FormErrorMessage({ altText }: ErrorMessageProps) {
    const { fieldState } = useContext(FieldContext)

    const message = fieldState.error?.message

    if (!message) {
        return (
            <Text fontSize="sm" color="secondary.mute">
                {altText}
            </Text>
        )
    }

    return (
        <HStack alignItems="center" space={1}>
            <MaterialIcon color="danger.solid" name="alert-circle-outline" size="sm" />
            <Text bold color="danger.solid" fontSize="sm">
                {message}
            </Text>
        </HStack>
    )
}
