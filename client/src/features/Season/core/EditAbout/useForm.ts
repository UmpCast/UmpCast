import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { SEASON_DATE_FORMAT } from '@/config/constants/dfns'
import {
    SeasonAboutEditScreen_SeasonFragment,
    useSeasonEditAboutMutation
} from '@/graphql/generated'
import { usePassiveServerErrors } from '@/hooks/useFormInputErrors'

import { seasonSchema } from '../../schema'

export interface SeasonEditInput {
    name: string
    endDate: string
}

export interface SesaonEditAboutFormOptions {
    seasonId: string
    season?: SeasonAboutEditScreen_SeasonFragment | null
    onEdit?: (input: SeasonEditInput) => any
}

export default function useSeasonEditAboutForm({
    seasonId,
    season,
    onEdit = () => {}
}: SesaonEditAboutFormOptions) {
    const { control, handleSubmit, reset, setError, formState } = useForm<SeasonEditInput>({
        resolver: yupResolver(seasonSchema)
    })

    const [{ data: updateData }, updateSeason] = useSeasonEditAboutMutation()
    usePassiveServerErrors(setError, updateData?.updateSeason?.errors)

    useEffect(() => {
        if (!season) return
        const { name, endDate } = season
        reset({
            name,
            endDate: format(new Date(endDate), SEASON_DATE_FORMAT)
        })
    }, [season])

    const onSubmit = useCallback(
        handleSubmit(async (input) => {
            const { data } = await updateSeason({
                input: {
                    seasonId,
                    name: input.name,
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
