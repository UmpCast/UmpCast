import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { useSeasonCreateMutation } from '@/generated'
import { usePassiveServerErrors } from '@/hooks/form/useServerErrors'
import { seasonSchema } from '../schema'

export interface SeasonCreateInput {
    name: string
    startDate: string
    endDate: string
}

export interface UseSeasonCreateFormProp {
    seasonId: string
    onEdit: (input: SeasonCreateInput) => any
}

export default function useSeasonCreateForm({
    seasonId,
    onEdit
}: UseSeasonCreateFormProp) {
    const { control, handleSubmit, setError, formState } =
        useForm<SeasonCreateInput>({
            resolver: yupResolver(seasonSchema)
        })
    const [{ data: createSeasonData }, createSeason] = useSeasonCreateMutation()
    usePassiveServerErrors(setError, createSeasonData?.createSeason.errors)

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
            if (data?.createSeason.errors.length !== 0) return

            onEdit(input)
        }),
        [handleSubmit]
    )

    return {
        onSubmit,
        formState,
        control
    }
}
