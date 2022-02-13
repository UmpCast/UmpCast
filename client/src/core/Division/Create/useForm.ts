import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useCreateDivisionMutation } from '@/generated'
import useServerErrors from '@/hooks/form/useServerErrors'
import { useForm } from 'react-hook-form'

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
    const [{ data: creationData }, createDivision] = useCreateDivisionMutation()

    const utils = useForm<DivisionCreateInput>({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(divisionCreateSchema)
    })
    const handleErrors = useServerErrors(utils.setError)

    const onSubmit = utils.handleSubmit(async (input) => {
        const { data } = await createDivision({
            input: {
                name: input.name,
                seasonId
            }
        })

        handleErrors(data?.createDivision?.errors) || onSuccess(input)
    })

    return {
        ...utils,
        onSubmit
    }
}
