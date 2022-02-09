import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useCreatePositionMutation } from '@/generated'
import useServerErrors from '@/hooks/form/useServerErrors'

export interface CreatePositionInput extends Record<'name', string> {}

const createPositionSchema = yup.object().shape({
    name: yup.string().required('position name is required')
})

export interface CreatePositionFormProps {
    divisionId: string
    onSuccess: (input: CreatePositionInput) => void
}

export default function useCreatePositionForm({
    divisionId,
    onSuccess
}: CreatePositionFormProps) {
    const [{ data: createData }, createPosition] = useCreatePositionMutation()

    const utils = useForm<CreatePositionInput>({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(createPositionSchema)
    })
    const { setError, handleSubmit } = utils

    useServerErrors(setError, createData?.createPosition?.errors)

    const onSubmit = handleSubmit(async (input) => {
        const { data } = await createPosition({
            input: {
                name: input.name,
                divisionId
            }
        })

        if (!data) return

        const errors = data?.createPosition?.errors ?? []

        if (errors.length > 0) return

        onSuccess(input)
    })

    return {
        ...utils,
        onSubmit
    }
}
