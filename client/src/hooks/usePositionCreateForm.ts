import { useCreatePositionMutation } from '@/generated'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import useSetInputErrors from './useSetInputErrors'

export interface PositionCreateInput extends Record<'name', string> {}

const createPositionSchema = yup.object().shape({
    name: yup.string().required('position name is required')
})

export interface PositionCreateFormConfig {
    divisionId: string
}

export default function usePositionCreateForm({
    divisionId
}: CreatePositionFormConfig) {
    const [_, createPosition] = useCreatePositionMutation()

    const utils = useForm<PositionCreateInput>({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(createPositionSchema)
    })

    const { setError, handleSubmit } = utils

    const setInputErrors = useSetInputErrors(setError)

    const submitPositionCreate = handleSubmit(async (input) => {
        const { data } = await createPosition({
            input: {
                name: input.name,
                divisionId: divisionId
            }
        })

        if (!data) return

        setInputErrors(data?.createPosition?.errors)
    })

    return {
        ...utils,
        submitPositionCreate
    }
}
