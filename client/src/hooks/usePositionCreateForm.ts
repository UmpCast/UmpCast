import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { usePositionCreateMutation } from '@/generated'
import useFormInputErrors from '@/hooks/useFormInputErrors'

export interface PostionCreateFormInput {
    name: string
}

const positionCreateFormSchema = yup.object().shape({
    name: yup.string().required('position name is required')
})

export interface PostionCreateFormProps {
    divisionId: string
    onSuccess: (input: PostionCreateFormInput) => void
}

export default function usePostionCreateForm({
    divisionId,
    onSuccess
}: PostionCreateFormProps) {
    const [_, createPosition] = usePositionCreateMutation()

    const utils = useForm<PostionCreateFormInput>({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(positionCreateFormSchema)
    })

    const setServerErrors = useFormInputErrors(utils.setError)

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
