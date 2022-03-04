import { VStack, FormControl, HStack, Input, Button } from 'native-base'
import { Controller, useForm } from 'react-hook-form'

import { useSeasonCreateMutation } from '@/generated'
import { usePassiveServerErrors } from '@/hooks/form/useServerErrors'

export interface SeasonCreateInput {
    name: string
    startDate: string
    endDate: string
}

const isDate = (s: string) =>
    Boolean(s.match(/^\d{2}\/\d{2}\/\d{4}$/) && !Number.isNaN(Date.parse(s)))

export interface SeasonCreateFormProp {
    orgId: string
    onCreate: (input: SeasonCreateInput) => any
}

export default function SeasonCreateForm({
    orgId,
    onCreate
}: SeasonCreateFormProp) {
    const { control, handleSubmit, setError } = useForm<SeasonCreateInput>()
    const [{ data: createSeasonData }, createSeason] = useSeasonCreateMutation()
    usePassiveServerErrors(setError, createSeasonData?.createSeason.errors)

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
                    defaultValue=""
                    name="name"
                    render={({ field, fieldState: { error, invalid } }) => (
                        <FormControl isInvalid={invalid}>
                            <FormControl.Label>Name</FormControl.Label>
                            <Input
                                onChangeText={field.onChange}
                                testID="name-input"
                                value={field.value}
                            />
                            <FormControl.ErrorMessage>
                                {error?.type === 'required' && 'Required'}
                                {error?.type === 'pattern' &&
                                    'Only alphanumeric characters or space allowed'}
                                {error?.message ?? null}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    )}
                    rules={{
                        required: true,
                        pattern: /^[A-Za-z0-9 ]*$/
                    }}
                />
                <HStack space={4}>
                    <Controller
                        control={control}
                        defaultValue=""
                        name="startDate"
                        render={({ field, fieldState: { invalid, error } }) => (
                            <FormControl flex={1} isInvalid={invalid}>
                                <FormControl.Label>Start</FormControl.Label>
                                <Input
                                    onChangeText={field.onChange}
                                    placeholder="MM/DD/YY"
                                    testID="startDate-input"
                                    value={field.value}
                                />
                                <FormControl.ErrorMessage>
                                    {error?.type === 'required' && 'Required'}
                                    {error?.type === 'isDate' && 'Invalid date'}
                                    {error?.message ?? null}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        )}
                        rules={{
                            required: true,
                            validate: {
                                isDate
                            }
                        }}
                    />
                    <Controller
                        control={control}
                        defaultValue=""
                        name="endDate"
                        render={({ field, fieldState: { invalid, error } }) => (
                            <FormControl flex={1} isInvalid={invalid}>
                                <FormControl.Label>End</FormControl.Label>
                                <Input
                                    onChangeText={field.onChange}
                                    placeholder="MM/DD/YY"
                                    testID="endDate-input"
                                    value={field.value}
                                />
                                <FormControl.ErrorMessage>
                                    {error?.type === 'required' && 'Required'}
                                    {error?.type === 'isDate' && 'Invalid date'}
                                    {error?.message ?? null}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        )}
                        rules={{
                            required: true,
                            validate: {
                                isDate
                            }
                        }}
                    />
                </HStack>
            </VStack>
            <Button colorScheme="indigo" onPress={onSubmit}>
                Create
            </Button>
        </VStack>
    )
}
