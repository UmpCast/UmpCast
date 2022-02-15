import { useOrgEditMutation } from '@/generated'
import useServerErrors from '@/hooks/form/useServerErrors'
import { URLRegex } from '@/utils/web'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export type OrgEditInput = {
    title: string
    description: string
    profilePictureB64: string
    email: string
    websiteUrl: string
}

export const orgEditSchema = yup.object().shape({
    title: yup.string(),
    description: yup.string(),
    profilePictureB64: yup.string(),
    email: yup.string().email('email must be valid'),
    websiteUrl: yup.string().matches(URLRegex, {
        message: 'website must be a url',
        excludeEmptyString: true
    })
})

export interface OrgEditFormOptions {
    id: string
    currentValues: Partial<OrgEditInput>
    onSuccess: (input: OrgEditInput) => void
}

export default function useOrgEditForm({
    id,
    currentValues,
    onSuccess
}: OrgEditFormOptions) {
    const [_, editOrg] = useOrgEditMutation()

    const utils = useForm({
        defaultValues: {
            title: '',
            description: '',
            profilePictureB64: '',
            email: '',
            websiteUrl: '',
            ...currentValues
        },
        resolver: yupResolver(orgEditSchema)
    })

    const setServerErrors = useServerErrors(utils.setError)

    const onSubmit = utils.handleSubmit(async (input) => {
        const { data } = await editOrg({
            id,
            input
        })

        const errors = data?.patchOrganization.errors
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
