import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { SEASON_DATE_FORMAT } from '@/config/constants/dfns'
import {
    SeasonAboutEditScreen_SeasonFragment,
    useSeasonEditAboutMutation
} from '@/generated'
import { usePassiveServerErrors } from '@/hooks/useFormInputErrors'

import { seasonSchema } from '../../schema'

export interface SeasonEditInput {
    name: string
    startDate: string
    endDate: string
}

export interface SesaonEditAboutFormOptions {
    seasonId: string
    season?: SeasonAboutEditScreen_SeasonFragment | null
    onEdit?: (input: SeasonEditInput) => any
}

export default function useSesaonEditAboutForm({
    seasonId,
    season,
    onEdit = () => {}
}: SesaonEditAboutFormOptions) {
    const { control, handleSubmit, reset, setError, formState } =
        useForm<SeasonEditInput>({
            resolver: yupResolver(seasonSchema)
        })

    const [{ data: updateData }, updateSeason] = useSeasonEditAboutMutation()
    usePassiveServerErrors(setError, updateData?.updateSeason?.errors)

    useEffect(() => {
        if (!season) return
        const { name, startDate, endDate } = season
        reset({
            name,
            startDate: format(startDate, SEASON_DATE_FORMAT),
            endDate: format(endDate, SEASON_DATE_FORMAT)
        })
    }, [season])

    const onSubmit = useCallback(
        handleSubmit(async (input) => {
            const { data } = await updateSeason({
                input: {
                    seasonId,
                    name: input.name,
                    startDate: new Date(input.startDate).toISOString(),
                    endDate: new Date(input.endDate).toISOString()
                }
            })

            if (data?.updateSeason?.errors.length !== 0) return

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
