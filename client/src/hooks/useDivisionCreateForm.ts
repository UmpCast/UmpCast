import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useCreateDivisionMutation } from '@/generated'
import useFormInputErrors from '@/hooks/useFormInputErrors'

export interface DivisionCreateInput extends Record<'name', string> {}

const divisionCreateSchema = yup.object().shape({
    name: yup.string().required('division name is required')
})

export interface DivisionCreateFormProps {
    seasonId: string
    onSuccess: (input: DivisionCreateInput) => void
}

export default function useDivisionCreateForm({
    seasonId,
    onSuccess
}: DivisionCreateFormProps) {
    const [_, createDivision] = useCreateDivisionMutation()

    const utils = useForm<DivisionCreateInput>({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(divisionCreateSchema)
    })
    const setServerErrors = useFormInputErrors(utils.setError)

    const onSubmit = utils.handleSubmit(async (input) => {
        const { data } = await createDivision({
            input: {
                name: input.name,
                seasonId
            }
        })

        const errors = data?.createDivision?.errors

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
