import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useOrgCreateMutation } from '@/generated'
import { usePassiveServerErrors } from '@/hooks/useFormInputErrors'

export type OrgCreateFormInput = {
    name: string
    description: string
}

export const orgCreateFormSchema = yup.object().shape({
    name: yup.string().required('name is required'),
    description: yup.string()
})

type OrgCreateFormOptions = {
    onSuccess: (input: OrgCreateFormInput) => void
}

export default function useOrgCreateForm({ onSuccess }: OrgCreateFormOptions) {
    const [{ data: createData }, createOrg] = useOrgCreateMutation()

    const utils = useForm<OrgCreateFormInput>({
        defaultValues: {
            name: '',
            description: ''
        },
        resolver: yupResolver(orgCreateFormSchema)
    })

    usePassiveServerErrors(
        utils.setError,
        createData?.createOrganization?.errors
    )

    const onSubmit = utils.handleSubmit(async (input: OrgCreateFormInput) => {
        const { data } = await createOrg({ input })

        const errors = data?.createOrganization?.errors

        if (errors?.length !== 0) return

        onSuccess(input)
    })

    return {
        onSubmit,
        ...utils
    }
}
