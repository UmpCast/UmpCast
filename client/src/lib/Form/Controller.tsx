import { View, Text } from 'react-native'
import * as HF from 'react-hook-form'
import { FieldContext } from './FieldContext'

export interface ControllerProps extends HF.ControllerProps {}

export default function Controller({ render, ...rest }: ControllerProps) {
    return (
        <HF.Controller
            {...rest}
            render={(fieldProps) => {
                return (
                    <FieldContext.Provider value={fieldProps}>
                        {render(fieldProps)}
                    </FieldContext.Provider>
                )
            }}
        />
    )
}
