import { useOrgEditMutation } from '@/generated'
import useServerErrors from '@/hooks/form/useServerErrors'
import { URLRegex } from '@/utils/web'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export type OrgEditInput = {
    title: string
    description: string
    logoB64: string
    email: string
    websiteUrl: string
}

export const orgEditSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string(),
    logoB64: yup.string(),
    email: yup.string().email('email must be valid'),
    websiteUrl: yup.string().matches(URLRegex, {
        message: 'website must be a url',
        excludeEmptyString: true
    })
})

export interface OrgEditFormOptions {
    id: string
    onSuccess?: (input: OrgEditInput) => void
}

export default function useOrgEditForm({ id, onSuccess }: OrgEditFormOptions) {
    const [_, editOrg] = useOrgEditMutation()

    const utils = useForm({
        defaultValues: {
            title: '',
            description: '',
            logoB64: '',
            email: '',
            websiteUrl: ''
        },
        resolver: yupResolver(orgEditSchema)
    })

    const setServerErrors = useServerErrors(utils.setError)

    const onSubmit = utils.handleSubmit(async (input) => {
        const { data } = await editOrg({
            id,
            input
        })

        const errors = data?.updateOrganization.errors
        if (errors?.length !== 0) {
            setServerErrors(errors)
            return
        }

        if (onSuccess) onSuccess(input)
    })

    return {
        ...utils,
        onSubmit
    }
}
