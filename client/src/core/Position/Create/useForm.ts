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
    const [_, createPosition] = useCreatePositionMutation()

    const utils = useForm<CreatePositionInput>({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(createPositionSchema)
    })

    const setServerErrors = useServerErrors(utils.setError)

    const onSubmit = utils.handleSubmit(async (input) => {
        const { data } = await createPosition({
            input: {
                name: input.name,
                divisionId
            }
        })

        const errors = data?.createPosition?.errors

        if (errors?.length !== 0) {
            setServerErrors(errors)
            return
        }

        onSuccess(input)
    })

    return {
        ...utils,
        onSubmit
    }
}
