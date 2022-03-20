import { ComponentID } from '@/testing/testID'
import { FormControl, IFormControlProps } from 'native-base'
import { useContext } from 'react'

import { FieldContext } from './FieldContext'

export interface ControlProps extends IFormControlProps {}

export default function Control(props: ControlProps) {
    const { field, fieldState } = useContext(FieldContext)
    return (
        <FormControl
            flex={1}
            isInvalid={fieldState.invalid}
            testID={`${ComponentID.FORM_CONTROL}:${field.name}`}
            {...props}
        />
    )
}
