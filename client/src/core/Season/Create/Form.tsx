import { parse, isValid, isAfter } from 'date-fns'
import { VStack, FormControl, HStack, Input, Button } from 'native-base'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useSeasonCreateMutation } from '@/generated'
import { usePassiveServerErrors } from '@/hooks/form/useServerErrors'

export interface SeasonCreateInput {
    name: string
    startDate: string
    endDate: string
}

const parseDate = (s: string) => parse(s, 'MM/dd/yyyy', new Date())
const isDate = (s: string) => isValid(parseDate(s)) || 'Invalid date'

export interface SeasonCreateFormProp {
    orgId: string
    onCreate: (input: SeasonCreateInput) => any
}

export default function SeasonCreateForm({
    orgId,
    onCreate
}: SeasonCreateFormProp) {
    const { control, handleSubmit, setError, getValues, trigger } =
        useForm<SeasonCreateInput>()
    const [{ data: createSeasonData }, createSeason] = useSeasonCreateMutation()
    usePassiveServerErrors(setError, createSeasonData?.createSeason.errors)

    const onSubmit = useCallback(
        handleSubmit(async (input) => {
            const { startDate, endDate, ...rest } = input

            const { data } = await createSeason({
                input: {
                    organizationId: orgId,
                    startDate: parseDate(startDate).toISOString(),
                    endDate: parseDate(endDate).toISOString(),
                    ...rest
                }
            })
            if (data?.createSeason.errors.length !== 0) return

            onCreate(input)
        }),
        [handleSubmit]
    )

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
                                {error?.message ?? null}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    )}
                    rules={{
                        required: { value: true, message: 'Required' },
                        pattern: {
                            value: /^[a-zA-z0-9 ]*$/,
                            message: 'Invalid characters found'
                        }
                    }}
                />
                <HStack space={4}>
                    <Controller
                        control={control}
                        defaultValue=""
                        name="startDate"
                        render={({
                            field,
                            fieldState: { invalid, error },
                            formState
                        }) => (
                            <FormControl flex={1} isInvalid={invalid}>
                                <FormControl.Label>Start</FormControl.Label>
                                <Input
                                    onChangeText={(v) => {
                                        field.onChange(v)
                                        if (formState.isSubmitted)
                                            trigger('endDate')
                                    }}
                                    placeholder="MM/DD/YYYY"
                                    testID="startDate-input"
                                    value={field.value}
                                />
                                <FormControl.ErrorMessage>
                                    {error?.message ?? null}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        )}
                        rules={{
                            required: { value: true, message: 'Required' },
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
                                    placeholder="MM/DD/YYYY"
                                    testID="endDate-input"
                                    value={field.value}
                                />
                                <FormControl.ErrorMessage>
                                    {error?.message ?? null}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        )}
                        rules={{
                            required: { value: true, message: 'Required' },
                            validate: {
                                isDate,
                                afterStartDate: () => {
                                    const [start, end] = getValues([
                                        'startDate',
                                        'endDate'
                                    ]).map(parseDate)
                                    return (
                                        !isValid(start) ||
                                        isAfter(end, start) ||
                                        'Must be after start date'
                                    )
                                }
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
