import { VStack, FormControl } from 'native-base'
import { Control } from 'react-hook-form'
import NBController from './NBController'
import NBErrorMessage from './NBErrorMessage'
import NBInput from './NBInput'

export default function NBControlledInput({
    control,
    title,
    name
}: {
    control: Control<any>
    title: string
    name: string
}) {
    return (
        <NBController
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <VStack>
                    <FormControl.Label>{title}</FormControl.Label>
                    <NBInput field={field} />
                    <NBErrorMessage field={field} fieldState={fieldState} />
                </VStack>
            )}
        />
    )
}
