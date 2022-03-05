import {
    ControllerProps as HFControllerProps,
    Controller as HFController
} from 'react-hook-form'

import { FieldContext } from './FieldContext'

export interface ControllerProps extends HFControllerProps<any> {}

export default function Controller({ render, ...rest }: ControllerProps) {
    return (
        <HFController
            defaultValue=""
            render={(fieldProps) => (
                <FieldContext.Provider value={fieldProps}>
                    {render(fieldProps)}
                </FieldContext.Provider>
            )}
            {...rest}
        />
    )
}
