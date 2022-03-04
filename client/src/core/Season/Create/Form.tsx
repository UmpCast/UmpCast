import { useSeasonCreateMutation } from '@/generated'
import { usePassiveServerErrors } from '@/hooks/form/useServerErrors'
import { VStack, FormControl, HStack, Input, Button } from 'native-base'
import { Controller, useForm } from 'react-hook-form'

export interface SeasonCreateInput {
    name: string
    startDate: string
    endDate: string
}

const isDate = (s: string) => {
    return Boolean(s.match(/^\d{2}\/\d{2}\/\d{4}$/) && !isNaN(Date.parse(s)))
}

export interface SeasonCreateFormProp {
    orgId: string
    onCreate: (input: SeasonCreateInput) => any
}

export default function SeasonCreateForm({
    orgId,
    onCreate
}: SeasonCreateFormProp) {
    const { control, handleSubmit, setError, reset } =
        useForm<SeasonCreateInput>()
    const [{ data }, createSeason] = useSeasonCreateMutation()
    usePassiveServerErrors(setError, data?.createSeason.errors)

    const onSubmit = handleSubmit(async (input) => {
        const { data } = await createSeason({
            input: {
                organizationId: orgId,
                name: input.name,
                startDate: new Date(input.startDate).toISOString(),
                endDate: new Date(input.endDate).toISOString()
            }
        })
        if (data?.createSeason.errors.length !== 0) return

        onCreate(input)
    })

    return (
        <VStack space={6}>
            <VStack space={4}>
                <Controller
                    control={control}
                    name="name"
                    defaultValue=""
                    rules={{
                        required: true,
                        pattern: /^[A-Za-z0-9 ]*$/
                    }}
                    render={({ field, fieldState: { error, invalid } }) => (
                        <FormControl isInvalid={invalid}>
                            <FormControl.Label>Name</FormControl.Label>
                            <Input
                                onChangeText={field.onChange}
                                value={field.value}
                                testID="name-input"
                            />
                            <FormControl.ErrorMessage>
                                {error?.type === 'required' && 'Required'}
                                {error?.type === 'pattern' &&
                                    'Only alphanumeric characters or space allowed'}
                                {error?.message ?? null}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    )}
                />
                <HStack space={4}>
                    <Controller
                        control={control}
                        name="startDate"
                        defaultValue=""
                        rules={{
                            required: true,
                            validate: {
                                isDate
                            }
                        }}
                        render={({ field, fieldState: { invalid, error } }) => (
                            <FormControl isInvalid={invalid} flex={1}>
                                <FormControl.Label>Start</FormControl.Label>
                                <Input
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    placeholder="MM/DD/YY"
                                    testID="startDate-input"
                                />
                                <FormControl.ErrorMessage>
                                    {error?.type === 'required' && 'Required'}
                                    {error?.type === 'isDate' && 'Invalid date'}
                                    {error?.message ?? null}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        )}
                    />
                    <Controller
                        control={control}
                        name="endDate"
                        defaultValue=""
                        rules={{
                            required: true,
                            validate: {
                                isDate
                            }
                        }}
                        render={({ field, fieldState: { invalid, error } }) => (
                            <FormControl isInvalid={invalid} flex={1}>
                                <FormControl.Label>End</FormControl.Label>
                                <Input
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    placeholder="MM/DD/YY"
                                    testID="endDate-input"
                                />
                                <FormControl.ErrorMessage>
                                    {error?.type === 'required' && 'Required'}
                                    {error?.type === 'isDate' && 'Invalid date'}
                                    {error?.message ?? null}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        )}
                    />
                </HStack>
            </VStack>
            <Button colorScheme="indigo" onPress={onSubmit}>
                Create
            </Button>
        </VStack>
    )
}
