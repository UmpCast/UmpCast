import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { seasonSchema } from '@/core/Season/schema'
import { useSeasonCreateMutation } from '@/generated'
import { usePassiveServerErrors } from '@/hooks/useFormInputErrors'

export interface SeasonCreateInput {
    name: string
    startDate: string
    endDate: string
}

export interface UseSeasonCreateFormProp {
    orgId: string
    onCreate: (input: SeasonCreateInput) => any
}

export default function useSeasonCreateForm({
    orgId,
    onCreate
}: UseSeasonCreateFormProp) {
    const { control, handleSubmit, setError, formState } =
        useForm<SeasonCreateInput>({
            resolver: yupResolver(seasonSchema)
        })
    const [{ data: createData }, createSeason] = useSeasonCreateMutation()
    usePassiveServerErrors(setError, createData?.createSeason?.errors)

    const onSubmit = useCallback(
        handleSubmit(async (input) => {
            const { data } = await createSeason({
                input: {
                    organizationId: orgId,
                    name: input.name,
                    startDate: new Date(input.startDate).toISOString(),
                    endDate: new Date(input.endDate).toISOString()
                }
            })

            if (data?.createSeason?.errors.length !== 0) return

            onCreate(input)
        }),
        [handleSubmit, createSeason]
    )

    return {
        onSubmit,
        formState,
        control
    }
}
