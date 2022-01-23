import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useCreatePositionMutation } from '@/generated'

import useSetInputErrors from './useSetInputErrors'

export interface CreatePositionInput extends Record<'name', string> {}

const createPositionSchema = yup.object().shape({
    name: yup.string().required('position name is required')
})

export interface CreatePositionFormProps {
    divisionId: string
}

export default function useCreatePositionForm({
    divisionId
}: CreatePositionFormProps) {
    const [_, createPosition] = useCreatePositionMutation()

    const utils = useForm<CreatePositionInput>({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(createPositionSchema)
    })

    const { setError, handleSubmit } = utils

    const setInputErrors = useSetInputErrors(setError)

    const submitCreatePosition = handleSubmit(async (input) => {
        const { data } = await createPosition({
            input: {
                name: input.name,
                divisionId
            }
        })

        if (!data) return

        const errors = data?.createPosition?.errors ?? []
        setInputErrors(errors)
    })

    return {
        ...utils,
        submitCreatePosition
    }
}
