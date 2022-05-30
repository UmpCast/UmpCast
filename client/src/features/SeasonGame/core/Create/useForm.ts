import { yupResolver } from '@hookform/resolvers/yup'
import { addHours, isBefore } from 'date-fns'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useGameCreateMutation } from '@/generated'
import useFormInputErrors from '@/hooks/useFormInputErrors'

export type SeasonGameCreateInput = {
    name: string
    divisionId: string
    startTime: Date
    endTime: Date
    location: string
}

const schema = yup.object({
    name: yup.string().required(),
    startTime: yup.date().required(),
    endTime: yup.date(),
    location: yup.string(),
    divisionId: yup.string().required()
})

const resolver = yupResolver(schema)

export interface SeasonGameCreateFormOptions {
    startTime: Date
}

export default function useSeasonGameCreateForm({
    startTime
}: SeasonGameCreateFormOptions) {
    const { control, handleSubmit, setError } = useForm<SeasonGameCreateInput>({
        defaultValues: {
            name: '',
            divisionId: '',
            startTime,
            endTime: addHours(startTime, 1),
            location: ''
        },
        resolver: async (fields, context, options) => {
            const result = await resolver(fields, context, options)

            if (isBefore(fields.endTime, fields.startTime)) {
                result.errors = {
                    endTime: {
                        message: 'Must be after start time'
                    },
                    ...result.errors
                }
            }

            return result
        }
    })

    const [_, createGame] = useGameCreateMutation()

    const setInputErrors = useFormInputErrors(setError)

    const newHandleSubmit = (
        handleSuccess: (input: SeasonGameCreateInput) => any
    ) =>
        handleSubmit(async (input) => {
            const { data } = await createGame({
                input: {
                    name: input.name,
                    divisionId: input.divisionId,
                    startTime: input.startTime.toISOString(),
                    endTime: input.endTime?.toISOString() ?? null,
                    location: input.location === '' ? null : input.location
                }
            })

            const errors = data?.createGame?.errors
            if (errors?.length !== 0) {
                setInputErrors(errors)
                return
            }

            handleSuccess(input)
        })

    return { control, handleSubmit: newHandleSubmit }
}
