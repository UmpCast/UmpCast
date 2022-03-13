import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useCreateOrganizationMutation } from '@/generated'
import { usePassiveServerErrors } from '@/hooks/useFormInputErrors'

export type OrgCreateInput = {
    name: string
    description: string
}

export const orgCreateSchema = yup.object().shape({
    name: yup.string().required('name is required'),
    description: yup.string()
})

type OrgCreateFormOptions = {
    onSuccess: (input: OrgCreateInput) => void
}

export default function useOrgCreateForm({ onSuccess }: OrgCreateFormOptions) {
    const [{ data: createData }, createOrg] = useCreateOrganizationMutation()

    const utils = useForm<OrgCreateInput>({
        defaultValues: {
            name: '',
            description: ''
        },
        resolver: yupResolver(orgCreateSchema)
    })

    usePassiveServerErrors(
        utils.setError,
        createData?.createOrganization?.errors
    )

    const onSubmit = utils.handleSubmit(async (input: OrgCreateInput) => {
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
