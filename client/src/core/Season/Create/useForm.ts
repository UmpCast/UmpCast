import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useSeasonCreateMutation } from '@/generated'
import { usePassiveServerErrors } from '@/hooks/form/useServerErrors'

export interface SeasonCreateInput {
    name: string
    startDate: string
    endDate: string
}

const seasonCreateSchema = yup.object({
    name: yup
        .string()
        .required()
        .matches(
            /^[A-Za-z0-9 ]*$/,
            'Only alphanumeric characters or space allowed'
        ),
    startDate: yup.string().required().isDate('MM/dd/yyyy'),
    endDate: yup.string().required().isDate('MM/dd/yyyy')
})

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
            resolver: yupResolver(seasonCreateSchema)
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

            onCreate(input)
        }),
        [handleSubmit]
    )

    return {
        onSubmit,
        formState,
        control
    }
}
