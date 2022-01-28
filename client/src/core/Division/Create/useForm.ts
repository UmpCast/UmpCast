import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
    useCreateDivisionMutation,
    useCreatePositionMutation
} from '@/generated'
import useServerErrors from '@/hooks/form/useServerErrors'

export interface DivisionCreateInput extends Record<'name', string> {}

const divisionCreateSchema = yup.object().shape({
    name: yup.string().required('division name is required')
})

export interface DivisionCreateFormProps {
    seasonId: string
    onCreate: (input: DivisionCreateInput) => void
}

export default function useDivisionCreateForm({
    seasonId,
    onCreate
}: DivisionCreateFormProps) {
    const [{ data }, createDivision] = useCreateDivisionMutation()

    const utils = useForm<DivisionCreateInput>({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(divisionCreateSchema)
    })
    const { setError, handleSubmit } = utils

    useServerErrors(data?.createDivision?.errors, setError)

    const onSubmit = handleSubmit(async (input) => {
        const { data } = await createDivision({
            input: {
                name: input.name,
                seasonId
            }
        })

        if (!data) return

        const errors = data?.createDivision?.errors ?? []

        if (errors.length > 0) return

        onCreate(input)
    })

    return {
        ...utils,
        onSubmit
    }
}
