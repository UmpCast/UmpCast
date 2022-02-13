import { useOrgCreateMutation } from '@/generated'
import useServerErrors from '@/hooks/form/useServerErrors'
import { useForm } from 'react-hook-form'

type OrgCreateInput = Record<'title' | 'email' | 'websiteUrl', string>

type OrgCreateFormOptions = {
    onSuccess: (input: OrgCreateInput) => void
}

export default function useOrgCreateForm({ onSuccess }: OrgCreateFormOptions) {
    const [_, createOrg] = useOrgCreateMutation()

    const utils = useForm<OrgCreateInput>({
        defaultValues: {
            title: '',
            email: '',
            websiteUrl: ''
        }
    })

    const handleErrors = useServerErrors(utils.setError)

    const onSubmit = utils.handleSubmit(async (input: OrgCreateInput) => {
        const { data } = await createOrg({ input })

        handleErrors(data?.createOrganization.errors) || onSuccess(input)
    })
}
