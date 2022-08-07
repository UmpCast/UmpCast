import {
    ControllerProps as HFControllerProps,
    Controller as HFController
} from 'react-hook-form'

import { FieldContext } from './FieldContext'
import { FormControl as NBFormControl, IFormControlProps } from 'native-base'

export interface FormControlProps
    extends HFControllerProps<any>,
        IFormControlProps {}

export default function FormControl({ render, ...rest }: FormControlProps) {
    return (
        <HFController
            defaultValue=""
            render={(fieldProps) => {
                const { fieldState } = fieldProps
                return (
                    <FieldContext.Provider value={fieldProps}>
                        <NBFormControl isInvalid={fieldState.invalid} {...rest}>
                            {render(fieldProps)}
                        </NBFormControl>
                    </FieldContext.Provider>
                )
            }}
            {...rest}
        />
    )
}
