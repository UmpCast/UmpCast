import { FormControl, IFormControlProps } from 'native-base'
import { useContext } from 'react'

import { TestID } from '@/testing/testID'

import { FieldContext } from './FieldContext'

export interface ControlProps extends IFormControlProps {}

export default function Control(props: ControlProps) {
    const { field, fieldState } = useContext(FieldContext)
    return (
        <FormControl
            isInvalid={fieldState.invalid}
            testID={`${TestID.FORM_CONTROL}:${field.name}`}
            {...props}
        />
    )
}
