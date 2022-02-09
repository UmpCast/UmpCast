import { VStack, FormControl } from 'native-base'
import { Control } from 'react-hook-form'

import NBErrorMessage from './ErrorMessage'
import NBFormControl from './FormControl'
import NBInput from './Input'

export default function NBControlledInput({
    control,
    title,
    name
}: {
    control: Control<any>
    title?: string
    name: string
}) {
    return (
        <NBFormControl
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <VStack>
                    {title ? (
                        <FormControl.Label>{title}</FormControl.Label>
                    ) : null}
                    <NBInput field={field} />
                    <NBErrorMessage field={field} fieldState={fieldState} />
                </VStack>
            )}
        />
    )
}
